"use client";

import React, { useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import Card from "@/components/Card";
import CardForm from "@/components/CardForm";

export default function Home() {
  const { cards, isConnected, createCard, deleteCard, isSubmitting } =
    useSocket();
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <main>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src="/favicon.svg" 
                  alt="Asking Card Logo" 
                  width={24} 
                  height={24}
                  style={{ flexShrink: 0 }}
                />
                <h1 className="header-title">Asking Card</h1>
              </div>
              <p className="header-subtitle">
                {cards.length} {cards.length === 1 ? "card" : "cards"} shared
              </p>
            </div>

            <div className="header-actions">
              <div className="connection-status">
                <div
                  className={`connection-dot ${isConnected ? "connected" : "disconnected"}`}
                />
                <span className="connection-text">
                  {isConnected ? "Live" : "Offline"}
                </span>
              </div>

              <button
                className="create-button"
                onClick={() => setShowCreateForm(!showCreateForm)}
              >
                {showCreateForm ? "Cancel" : "Create Card"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Create Form - Collapsible */}
      {showCreateForm && (
        <section className="create-form-section">
          <div className="container">
            <CardForm
              onSubmit={(cardData) => {
                createCard(cardData);
                setShowCreateForm(false);
              }}
              isSubmitting={isSubmitting}
            />
          </div>
        </section>
      )}

      {/* Main Content - Cards */}
      <div className="container">
        <section className="cards-section">
          {/* Cards Grid */}
          {cards.length > 0 ? (
            <div className="cards-grid">
              {cards.map((card) => (
                <Card key={card.id} card={card} onDelete={deleteCard} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">💭</div>
              <h3 className="empty-title">No cards yet</h3>
              <p className="empty-description">
                Tap &quot;Create Card&quot; to share your first question or
                idea.
              </p>
              {!showCreateForm && (
                <button
                  className="btn-primary empty-cta"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create Your First Card
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
