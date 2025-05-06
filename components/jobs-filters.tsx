"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const statuses = [
  "Todos",
  "Pendiente de envío",
  "Pendiente de recolección",
  "Enviado",
  "Entregado",
  "Reenviado a corrección",
]

const labs = [
  "Todos",
  "Laboratorio Dental XYZ",
  "Laboratorio Dental ABC",
]

export function JobsFilters() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <Input
        placeholder="Buscar por nombre del paciente..."
        className="md:w-[300px]"
      />
      <Select defaultValue="Todos">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por estado" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="Todos">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por laboratorio" />
        </SelectTrigger>
        <SelectContent>
          {labs.map((lab) => (
            <SelectItem key={lab} value={lab}>
              {lab}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 