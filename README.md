# DentalLabTracker

Una aplicación web moderna para gestionar los trabajos enviados a laboratorios dentales.

## Características

- Dashboard de trabajos enviados
- Gestión de laboratorios
- Filtros y búsqueda
- Interfaz responsiva y moderna
- PWA Ready

## Tecnologías

- Next.js (App Router)
- Tailwind CSS
- ShadCN UI
- Supabase

## Configuración

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/dental-lab-tracker.git
cd dental-lab-tracker
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Estructura de la base de datos

### Tablas

#### patients
- id (uuid)
- nombre (text)

#### labs
- id (uuid)
- nombre (text)
- telefono (text)
- direccion (text)

#### jobs
- id (uuid)
- paciente_id (uuid, foreign key)
- lab_id (uuid, foreign key)
- tipo_trabajo (text)
- fecha_envio (timestamp)
- fecha_entrega (timestamp)
- hora_entrega (text, nullable)
- estado (text)

## Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.
#   l a b o r a t o r i o s 1  
 