-- Create patients table
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL
);

-- Create labs table
CREATE TABLE labs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  telefono TEXT,
  direccion TEXT
);

-- Create jobs table
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  paciente_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
  tipo_trabajo TEXT NOT NULL,
  fecha_envio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_entrega TIMESTAMP WITH TIME ZONE NOT NULL,
  hora_entrega TEXT,
  estado TEXT NOT NULL DEFAULT 'Pendiente de envío',
  CONSTRAINT valid_estado CHECK (estado IN (
    'Pendiente de envío',
    'Pendiente de recolección',
    'Enviado',
    'Entregado',
    'Reenviado a corrección'
  ))
);

-- Create indexes
CREATE INDEX idx_jobs_paciente_id ON jobs(paciente_id);
CREATE INDEX idx_jobs_lab_id ON jobs(lab_id);
CREATE INDEX idx_jobs_estado ON jobs(estado);
CREATE INDEX idx_jobs_fecha_envio ON jobs(fecha_envio);
CREATE INDEX idx_jobs_fecha_entrega ON jobs(fecha_entrega); 