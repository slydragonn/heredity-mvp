import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const MyInheritances = ({ contract, account }) => {
  const [inheritances, setInheritances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState(null);

  useEffect(() => {
    const fetchInheritances = async () => {
      try {
        if (!contract) return;
        
        // Obtener IDs de testamentos donde el usuario es beneficiario
        const inheritanceIds = await contract.getTestamentsByBeneficiary(account);
        
        const inheritancesData = await Promise.all(
          inheritanceIds.map(async (id) => {
            const testament = await contract.getTestamentDetails(id);
            return {
              id: id.toString(),
              name: testament.name,
              creator: testament.creator,
              encryptedData: testament.encryptedData,
              deadline: new Date(testament.deadline.toNumber() * 1000),
              amount: ethers.utils.formatEther(testament.amount),
              claimed: testament.claimed,
              createdAt: new Date(testament.createdAt.toNumber() * 1000),
              canClaim: !testament.claimed && (new Date(testament.deadline.toNumber() * 1000) <= new Date())
            };
          })
        );
        
        setInheritances(inheritancesData);
      } catch (error) {
        console.error("Error fetching inheritances:", error);
        toast.error("Error al cargar tus herencias");
      } finally {
        setLoading(false);
      }
    };
    
    if (contract && account) {
      fetchInheritances();
    }
  }, [contract, account]);

  const claimInheritance = async (id) => {
    try {
      setClaimingId(id);
      
      const tx = await contract.claimTestament(id);
      
      toast.success("Reclamando herencia, por favor espera...");
      
      await tx.wait();
      
      toast.success("¡Herencia reclamada con éxito!");
      
      // Actualizar la lista de herencias
      setInheritances(prevInheritances => 
        prevInheritances.map(item => 
          item.id === id ? { ...item, claimed: true, canClaim: false } : item
        )
      );
    } catch (error) {
      console.error("Error claiming inheritance:", error);
      toast.error("Error al reclamar la herencia");
    } finally {
      setClaimingId(null);
    }
  };

  // Formatear dirección para mostrar
  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Formatear fecha para mostrar
  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd'T'HH:mm")
  };

  // Calcular tiempo restante
  const getTimeRemaining = (deadline) => {
    const now = new Date();
    let diff = deadline - now;
  
    if (diff <= 0) {
      return "Disponible ahora";
    }
  
    // Constantes en milisegundos
    const MS = {
      segundo: 1000,
      minuto: 1000 * 60,
      hora:   1000 * 60 * 60,
      día:    1000 * 60 * 60 * 24,
      mes:    1000 * 60 * 60 * 24 * 30,
      año:    1000 * 60 * 60 * 24 * 365,
    };
  
    // Cálculo de cada unidad
    const years   = Math.floor(diff / MS.año);
    diff -= years * MS.año;
  
    const months  = Math.floor(diff / MS.mes);
    diff -= months * MS.mes;
  
    const days    = Math.floor(diff / MS.día);
    diff -= days * MS.día;
  
    const hours   = Math.floor(diff / MS.hora);
    diff -= hours * MS.hora;
  
    const minutes = Math.floor(diff / MS.minuto);
    diff -= minutes * MS.minuto;
  
    const seconds = Math.floor(diff / MS.segundo);
  
    // Función de ayuda para pluralizar
    const fmt = (value, singular) =>
      value > 0 ? `${value} ${singular}${value === 1 ? "" : "s"}` : null;
  
    // Montamos el array de segmentos que no sean nulos
    const segments = [
      fmt(years,   "año"),
      fmt(months,  "mes"),
      fmt(days,    "día"),
      fmt(hours,   "hora"),
      fmt(minutes, "minuto"),
      fmt(seconds, "segundo"),
    ].filter(Boolean);
  
    return segments.join(", ") + " restantes";
  };
  

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Mis Herencias</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-avalanche"></div>
        </div>
      ) : inheritances.length === 0 ? (
        <div className="card text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No tienes herencias pendientes</h3>
          <p className="text-gray-600">
            Cuando alguien te designe como beneficiario, sus testamentos aparecerán aquí.
          </p>
        </div>
      ) : (
        <div>
          {inheritances.map((inheritance) => (
            <div key={inheritance.id} className="card mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{inheritance.name}</h3>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  inheritance.claimed 
                    ? 'bg-green-100 text-green-800' 
                    : inheritance.canClaim
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-blue-100 text-blue-800'
                }`}>
                  {inheritance.claimed 
                    ? 'Reclamado' 
                    : inheritance.canClaim
                      ? 'Disponible'
                      : 'Pendiente'
                  }
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Creador</p>
                  <p className="font-medium">{shortenAddress(inheritance.creator)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha Disponible</p>
                  <p className="font-medium">{formatDate(inheritance.deadline)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cantidad</p>
                  <p className="font-medium">{inheritance.amount} AVAX</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estado</p>
                  <p className="font-medium">
                    {inheritance.claimed 
                      ? 'Ya reclamado' 
                      : inheritance.canClaim
                        ? 'Listo para reclamar'
                        : getTimeRemaining(inheritance.deadline)
                    }
                  </p>
                </div>
              </div>
              
              {inheritance.claimed && inheritance.encryptedData && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Mensaje</p>
                  <div className="bg-gray-100 p-3 rounded-lg text-gray-800 break-words">
                    {inheritance.encryptedData}
                  </div>
                </div>
              )}
              
              {inheritance.canClaim && (
                <button
                  onClick={() => claimInheritance(inheritance.id)}
                  disabled={claimingId === inheritance.id}
                  className="btn btn-primary w-full mb-4"
                >
                  {claimingId === inheritance.id ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                      Reclamando...
                    </div>
                  ) : (
                    'Reclamar Herencia'
                  )}
                </button>
              )}
              
              <div className="border-t border-gray-200 pt-4 mt-2 text-sm text-gray-500">
                ID: {inheritance.id}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInheritances;