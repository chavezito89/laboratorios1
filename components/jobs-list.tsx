"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useJobs } from "@/contexts/jobs-context"
import { formatDate } from "@/lib/utils"

const statusColors = {
  "Pendiente de envío": "bg-yellow-500",
  "Pendiente de recolección": "bg-blue-500",
  "Enviado": "bg-purple-500",
  "Entregado": "bg-green-500",
  "Reenviado a corrección": "bg-red-500",
}

export function JobsList() {
  const { jobs, loading, error } = useJobs()

  if (loading) {
    return <div>Cargando trabajos...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!jobs || jobs.length === 0) {
    return <div>No hay trabajos que mostrar.</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {job.paciente?.nombre}
            </CardTitle>
            <Badge
              className={`${statusColors[job.estado as keyof typeof statusColors] || "bg-gray-500"} text-white`}
            >
              {job.estado}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Tipo:</span> {job.tipo_trabajo}
              </p>
              <p>
                <span className="font-medium">Laboratorio:</span> {job.lab?.nombre}
              </p>
              <p>
                <span className="font-medium">Fecha de envío:</span>{" "}
                {formatDate(job.fecha_envio)}
              </p>
              <p>
                <span className="font-medium">Fecha de entrega:</span>{" "}
                {formatDate(job.fecha_entrega)}
                {job.hora_entrega && ` - ${job.hora_entrega}`}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 