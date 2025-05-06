"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Job, Lab, Patient } from "@/types/database"

interface JobsContextType {
  jobs: Job[] | null
  labs: Lab[] | null
  patients: Patient[] | null
  loading: boolean
  error: string | null
  refreshJobs: () => Promise<void>
  refreshLabs: () => Promise<void>
  refreshPatients: () => Promise<void>
}

const JobsContext = createContext<JobsContextType | undefined>(undefined)

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [labs, setLabs] = useState<Lab[] | null>(null)
  const [patients, setPatients] = useState<Patient[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*, paciente:patients(*), lab:labs(*)")
        .order("created_at", { ascending: false })

      if (error) throw error

      setJobs(data)
    } catch (error) {
      console.error("Error fetching jobs:", error)
      setError("Error al cargar los trabajos")
    }
  }

  const fetchLabs = async () => {
    try {
      const { data, error } = await supabase
        .from("labs")
        .select("*")
        .order("nombre", { ascending: true })

      if (error) throw error

      setLabs(data)
    } catch (error) {
      console.error("Error fetching labs:", error)
      setError("Error al cargar los laboratorios")
    }
  }

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .order("nombre", { ascending: true })

      if (error) throw error

      setPatients(data)
    } catch (error) {
      console.error("Error fetching patients:", error)
      setError("Error al cargar los pacientes")
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchJobs(), fetchLabs(), fetchPatients()])
      setLoading(false)
    }

    loadData()
  }, [])

  const value = {
    jobs,
    labs,
    patients,
    loading,
    error,
    refreshJobs: fetchJobs,
    refreshLabs: fetchLabs,
    refreshPatients: fetchPatients,
  }

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
}

export function useJobs() {
  const context = useContext(JobsContext)
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobsProvider")
  }
  return context
} 