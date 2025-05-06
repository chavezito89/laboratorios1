"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useJobs } from "@/contexts/jobs-context"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Lab } from "@/types/database"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { EditLabForm } from "@/components/edit-lab-form"

export function LabsList() {
  const { labs, loading, error, refreshLabs } = useJobs()
  const { toast } = useToast()
  const [editingLab, setEditingLab] = useState<Lab | null>(null)

  const handleDelete = async (labId: string) => {
    try {
      const { error } = await supabase
        .from("labs")
        .delete()
        .eq("id", labId)

      if (error) throw error

      toast({
        title: "Laboratorio eliminado",
        description: "El laboratorio se ha eliminado correctamente.",
      })
      refreshLabs()
    } catch (error) {
      console.error("Error al eliminar el laboratorio:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ha ocurrido un error al eliminar el laboratorio.",
      })
    }
  }

  if (loading) {
    return <div>Cargando laboratorios...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!labs || labs.length === 0) {
    return <div>No hay laboratorios registrados.</div>
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <Card key={lab.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{lab.nombre}</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingLab(lab)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(lab.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Eliminar</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Teléfono:</span>{" "}
                  {lab.telefono || "No especificado"}
                </p>
                <p>
                  <span className="font-medium">Dirección:</span>{" "}
                  {lab.direccion || "No especificada"}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!editingLab} onOpenChange={() => setEditingLab(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Laboratorio</DialogTitle>
          </DialogHeader>
          {editingLab && (
            <EditLabForm
              lab={editingLab}
              onSuccess={() => {
                setEditingLab(null)
                refreshLabs()
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
} 