'use client';

import React from 'react';
import { CardComponentProps } from '@/types';

const Card: React.FC<CardComponentProps> = ({ card, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadFile = (file: any) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📽️';
    if (fileType.includes('zip') || fileType.includes('archive')) return '📦';
    return '📎';
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this card?')) {
      onDelete(card.id);
    }
  };

  return (
    <div className="card fade-in">
      <div className="card-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#000',
          lineHeight: '1.3',
          margin: 0,
          flex: 1
        }}>
          {card.topic}
        </h3>
        {onDelete && (
          <button
            onClick={handleDelete}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#666',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'all 0.2s ease-in-out',
              marginLeft: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f5f5';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#666';
            }}
            title="Delete card"
          >
            ×
          </button>
        )}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <p style={{
          fontSize: '16px',
          color: '#333',
          lineHeight: '1.6',
          marginBottom: card.file ? '16px' : '0'
        }}>
          {card.description}
        </p>
        
        {card.file && (
          <div style={{
            backgroundColor: '#f8f8f8',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ fontSize: '24px' }}>
              {getFileIcon(card.file.type)}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#000',
                margin: '0 0 2px 0'
              }}>
                {card.file.name}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#666',
                margin: 0
              }}>
                {formatFileSize(card.file.size)}
              </p>
            </div>
            <button
              onClick={() => downloadFile(card.file)}
              style={{
                backgroundColor: '#000',
                color: '#F3F3F1',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
              }}
            >
              Download
            </button>
          </div>
        )}
      </div>
      
      <div style={{
        fontSize: '14px',
        color: '#666',
        fontWeight: '500'
      }}>
        {formatDate(card.createdAt)}
      </div>
    </div>
  );
};

export default Card;