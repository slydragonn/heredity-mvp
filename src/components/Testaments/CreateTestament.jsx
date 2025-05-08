import React, { useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { Calendar, DollarSign, User, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import styles from './CreateTestament.module.css';
import { addMinutes, format } from "date-fns";

const CreateTestament = ({ contract, account }) => {
  const [name, setName] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!ethers.utils.isAddress(beneficiary)) {
      toast.error('Dirección de beneficiario inválida');
      return;
    }
    
    if (!deadlineDate) {
      toast.error('Por favor, selecciona una fecha límite');
      return;
    }
    
    const deadlineTimestamp = Math.floor(new Date(deadlineDate).getTime() / 1000);
    if (deadlineTimestamp <= Math.floor(Date.now() / 1000)) {
      toast.error('La fecha límite debe ser en el futuro');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const amountInWei = ethers.utils.parseEther(amount || '0');
      
      const tx = await contract.createTestament(
        name,
        beneficiary,
        encryptedData,
        deadlineTimestamp,
        { value: amountInWei }
      );
      
      toast.success('Transacción enviada, por favor espera la confirmación...');
      
      await tx.wait();
      
      toast.success('¡Testamento creado con éxito!');
      
      // Limpiar el formulario
      setName('');
      setBeneficiary('');
      setEncryptedData('');
      setDeadlineDate('');
      setAmount('');
    } catch (error) {
      console.error("Error al crear testamento:", error);
      toast.error('Error al crear el testamento');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDateTimeLocal = () => {
    return format(
      addMinutes(new Date(), 30),
      "yyyy-MM-dd'T'HH:mm"
    );
  };
  console.log(getMinDateTimeLocal());

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Crear Nuevo Testamento</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <User size={18} className={styles.labelIcon} />
              Nombre del Testamento
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ej: Testamento para mi hijo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <User size={18} className={styles.labelIcon} />
              Dirección del Beneficiario
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="0x..."
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <MessageSquare size={18} className={styles.labelIcon} />
              Mensaje Encriptado (Opcional)
            </label>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Mensaje para tu beneficiario..."
              value={encryptedData}
              onChange={(e) => setEncryptedData(e.target.value)}
            ></textarea>
            <p className={styles.helperText}>
              Este mensaje se almacenará en la blockchain y será visible para tu beneficiario.
            </p>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Calendar size={18} className={styles.labelIcon} />
              Fecha Límite
            </label>
            <input
              type="datetime-local"
              className={styles.input}
              min={getMinDateTimeLocal()}
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              required
            />
            <p className={styles.helperText}>
              A partir de esta fecha, tu beneficiario podrá reclamar la herencia.
            </p>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <DollarSign size={18} className={styles.labelIcon} />
              Cantidad de AVAX a Depositar
            </label>
            <div className={styles.inputWithSuffix}>
              <input
                type="number"
                className={styles.input}
                placeholder="1.0"
                min="1"
                step="0.001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className={styles.inputSuffix}>AVAX</span>
            </div>
          </div>
          
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                Procesando...
              </div>
            ) : (
              <>
                Crear Testamento
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTestament;
