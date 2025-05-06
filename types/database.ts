export interface Lab {
  id: string
  nombre: string
  telefono?: string
  direccion?: string
  created_at: string
  updated_at: string
}

export interface Patient {
  id: string
  nombre: string
  telefono?: string
  email?: string
  created_at: string
  updated_at: string
}

export interface Job {
  id: string
  paciente_id: string
  lab_id: string
  status: string
  descripcion?: string
  fecha_entrega?: string
  created_at: string
  updated_at: string
  paciente?: Patient
  lab?: Lab
} 