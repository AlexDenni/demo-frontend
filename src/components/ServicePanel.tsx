import React from "react";

interface ServicePanelProps {
  title: string;
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

const ServicePanel: React.FC<ServicePanelProps> = ({
  title,
  loading,
  error,
  children,
}) => {
  return (
    <section className="service-panel">
      <h2>{title}</h2>
      {loading && <p>Loading...</p>}
      {error && <p role="alert">Error: {error}</p>}
      {!loading && !error && children}
    </section>
  );
};

export default ServicePanel;
