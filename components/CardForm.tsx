'use client';

import React, { useState } from 'react';
import { CardFormProps, CardFormData, CardFile } from '@/types';

const CardForm: React.FC<CardFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState<CardFormData>({
    topic: '',
    description: ''
  });
  const [errors, setErrors] = useState<Partial<CardFormData>>({});
  const [descriptionType, setDescriptionType] = useState<'text' | 'file'>('text');
  const [uploadedFile, setUploadedFile] = useState<CardFile | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<CardFormData> = {};
    
    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required';
    } else if (formData.topic.trim().length < 3) {
      newErrors.topic = 'Topic must be at least 3 characters';
    }
    
    if (descriptionType === 'text') {
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      } else if (formData.description.trim().length < 10) {
        newErrors.description = 'Description must be at least 10 characters';
      }
    } else {
      if (!uploadedFile) {
        newErrors.description = 'Please upload a file';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submissionData: CardFormData = {
        topic: formData.topic.trim(),
        description: descriptionType === 'text' ? formData.description.trim() : `File: ${uploadedFile?.name}`,
      };

      if (descriptionType === 'file' && uploadedFile) {
        submissionData.file = uploadedFile;
      }

      onSubmit(submissionData);
      
      // Reset form after successful submission
      setFormData({ topic: '', description: '' });
      setUploadedFile(null);
      setDescriptionType('text');
      setErrors({});
    }
  };

  const handleChange = (field: keyof CardFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        description: 'File size must be less than 5MB'
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      const fileData: CardFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        data: base64Data
      };
      setUploadedFile(fileData);
      
      // Clear errors when file is uploaded
      setErrors(prev => ({
        ...prev,
        description: undefined
      }));
    };
    reader.readAsDataURL(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="card" style={{ marginBottom: '40px' }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '24px',
        color: '#000'
      }}>
        Create a New Card
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '500',
            marginBottom: '8px',
            color: '#000'
          }}>
            Topic
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            placeholder="Enter the topic or title of your card"
            className="input-field"
            disabled={isSubmitting}
            style={{
              borderColor: errors.topic ? '#ff4444' : undefined
            }}
          />
          {errors.topic && (
            <p style={{
              color: '#ff4444',
              fontSize: '14px',
              marginTop: '4px',
              fontWeight: '500'
            }}>
              {errors.topic}
            </p>
          )}
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '500',
            marginBottom: '12px',
            color: '#000'
          }}>
            Description Type
          </label>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => {
                setDescriptionType('text');
                setUploadedFile(null);
                setErrors(prev => ({ ...prev, description: undefined }));
              }}
              disabled={isSubmitting}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                border: '2px solid',
                borderColor: descriptionType === 'text' ? '#000' : 'rgba(0, 0, 0, 0.2)',
                backgroundColor: descriptionType === 'text' ? '#000' : 'transparent',
                color: descriptionType === 'text' ? '#F3F3F1' : '#000',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Text
            </button>
            <button
              type="button"
              onClick={() => {
                setDescriptionType('file');
                setFormData(prev => ({ ...prev, description: '' }));
                setErrors(prev => ({ ...prev, description: undefined }));
              }}
              disabled={isSubmitting}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                border: '2px solid',
                borderColor: descriptionType === 'file' ? '#000' : 'rgba(0, 0, 0, 0.2)',
                backgroundColor: descriptionType === 'file' ? '#000' : 'transparent',
                color: descriptionType === 'file' ? '#F3F3F1' : '#000',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              File Upload
            </button>
          </div>

          {descriptionType === 'text' ? (
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe your topic in detail"
              className="input-field"
              disabled={isSubmitting}
              rows={4}
              style={{
                resize: 'vertical',
                minHeight: '120px',
                borderColor: errors.description ? '#ff4444' : undefined
              }}
            />
          ) : (
            <div>
              <div style={{
                border: '2px dashed rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: '#fff',
                borderColor: errors.description ? '#ff4444' : undefined
              }}>
                {uploadedFile ? (
                  <div>
                    <div style={{
                      fontSize: '32px',
                      marginBottom: '8px'
                    }}>
                      📎
                    </div>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#000',
                      marginBottom: '4px'
                    }}>
                      {uploadedFile.name}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      {formatFileSize(uploadedFile.size)}
                    </p>
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      style={{
                        marginTop: '8px',
                        padding: '4px 12px',
                        backgroundColor: 'transparent',
                        color: '#666',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      fontSize: '32px',
                      marginBottom: '8px'
                    }}>
                      📁
                    </div>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#000',
                      marginBottom: '4px'
                    }}>
                      Drop your file here or click to browse
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '12px'
                    }}>
                      Maximum file size: 5MB
                    </p>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      disabled={isSubmitting}
                      accept="*/*"
                      style={{ display: 'none' }}
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: '#000',
                        color: '#F3F3F1',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {errors.description && (
            <p style={{
              color: '#ff4444',
              fontSize: '14px',
              marginTop: '4px',
              fontWeight: '500'
            }}>
              {errors.description}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
          style={{
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Creating Card...' : 'Create Card'}
        </button>
      </form>
    </div>
  );
};

export default CardForm;