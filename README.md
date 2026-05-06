# ASELUBE — Qlik Sense Mashup Extension

Dashboard de analítica comercial avanzada para Mercanza, construido como un mashup de Qlik Sense. Permite analizar ventas por líneas de producto, visualizar KPIs, generar reportes y explorar datos geográficamente, todo desde una interfaz multilingüe con soporte de temas claro/oscuro.

---

## Tabla de contenidos

1. [Descripción general](#descripción-general)
2. [Requisitos previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Arquitectura técnica](#arquitectura-técnica)
6. [Secciones del dashboard](#secciones-del-dashboard)
7. [Sistema de rutas](#sistema-de-rutas)
8. [Componentes y directivas](#componentes-y-directivas)
9. [El Equalizador (configurador de gráficos)](#el-equalizador-configurador-de-gráficos)
10. [Internacionalización (i18n)](#internacionalización-i18n)
11. [Temas y estilos](#temas-y-estilos)
12. [Configuración inicial](#configuración-inicial)
13. [Integración con Qlik Sense](#integración-con-qlik-sense)
14. [Flujo de arranque](#flujo-de-arranque)

---

## Descripción general

| Campo     | Valor                          |
|-----------|-------------------------------|
| Nombre    | ASELUBE                        |
| Tipo      | Mashup de Qlik Sense           |
| Cliente   | Mercanza                       |
| Autor     | Jesús Yepes López              |
| Versión mínima Qlik | >= 3.0.x              |
| Idiomas   | Español, Inglés, Francés       |
| Categorías | Financiero, Servicios         |

Un **mashup de Qlik Sense** es una aplicación web personalizada que consume la API de Qlik para renderizar visualizaciones y datos fuera del entorno estándar de Qlik Sense Hub. Esto permite un control total sobre el diseño, la navegación y la experiencia del usuario.

---

## Requisitos previos

- **Qlik Sense Desktop** o **Qlik Sense Server** (versión >= 3.0.x)
- Una aplicación Qlik (`.qvf`) con el modelo de datos de ASELUBE cargada en el servidor
- Servidor web para servir los ficheros del mashup (en desarrollo puede usarse el propio Qlik Sense Desktop)
- Node.js (opcional, solo si se quiere levantar un servidor de desarrollo local independiente)

---

## Instalación

1. Copiar la carpeta `aselube/` completa en el directorio de extensiones de Qlik Sense:
   - **Desktop:** `C:\Users\<usuario>\Documents\Qlik\Sense\Extensions\`
   - **Server:** `<QlikSenseInstall>\Repository\Extensions\`

2. Abrir Qlik Sense. La extensión quedará registrada automáticamente.

3. Editar [js/Controllers/InitConfig.js](js/Controllers/InitConfig.js) para apuntar al `appId` correcto de la aplicación Qlik (ver sección [Configuración inicial](#configuración-inicial)).

4. Abrir en el navegador la URL del mashup:
   ```
   http://<servidor>/extensions/aselube/index.html
   ```

---

## Estructura del proyecto

```
aselube/
├── index.html                  # Punto de entrada de la aplicación
├── aselube.qext                # Manifiesto de la extensión para Qlik
├── favicon.ico
├── images.png                  # Imagen de previsualización en Qlik Hub
├── wbfolder.wbl                # Configuración de entorno de trabajo
│
├── assets/
│   ├── img/
│   │   ├── bg/                 # ~20 imágenes de fondo intercambiables
│   │   ├── flags/              # Iconos de banderas para selector de idioma
│   │   ├── logos/              # Logotipos de la aplicación
│   │   └── wellcomeImages/     # Gráficos de la pantalla de bienvenida
│   ├── sidebarImages/          # Imágenes para el menú lateral
│   └── videoHelp/              # Vídeos tutoriales del sistema de ayuda
│
├── css/
│   ├── main.css                # Hoja de estilos principal (importa los partials)
│   ├── animate.css             # Animaciones CSS
│   ├── normalize.min.css       # Reset/normalización de estilos
│   ├── icofont.css             # Librería de iconos (IcoFont)
│   ├── wellcome.css            # Estilos exclusivos de la pantalla de bienvenida
│   ├── customStyle.css         # Sobrescrituras del tema personalizado
│   ├── media-queries-*.css     # Diseño responsivo por breakpoint
│   ├── estilos/
│   │   └── dark.css            # Tema oscuro
│   └── partials/               # Estilos por componente
│       ├── main-menu.css
│       ├── main-content.css
│       ├── top-header.css
│       ├── kpi_object.css
│       ├── box-current-selections.css
│       └── ...                 # ~11 archivos más
│
├── fonts/
│   ├── Roboto/                 # Familia tipográfica principal
│   └── Montserrat/             # Tipografía secundaria
│
├── include/                    # Librerías de terceros (bundled)
│   ├── jquery-3.3.1.min.js
│   ├── jquery-ui-1.12.1/
│   ├── bootstrap-4/
│   ├── angular-ui-router.min.js
│   ├── angular-translate/      # Sistema i18n
│   ├── particles/              # Animación de partículas en fondo
│   ├── select2/                # Dropdowns mejorados
│   └── ...
│
├── js/
│   ├── require-config.js       # Configuración de paths para RequireJS
│   ├── main.js                 # Bootstrap de módulos Angular
│   ├── app.js                  # Definición del módulo Angular principal
│   ├── page.js                 # Inicialización de página
│   ├── site.js                 # Utilidades de tema
│   ├── utilities.js            # Funciones helper reutilizables
│   │
│   ├── Controllers/
│   │   ├── InitConfig.js       # Configuración global (app ID, idioma, tema)
│   │   ├── PageControllerCtrl.js  # Controlador raíz de la página
│   │   ├── KpiCtrl.js          # Controlador del widget KPI
│   │   ├── Home/
│   │   │   ├── HomeCtrl.js     # Página de inicio
│   │   │   └── WellcomeCtrl.js # Pantalla de bienvenida
│   │   ├── Equalizador/        # Configurador dinámico de gráficos
│   │   │   ├── equalizadorCtrl.js
│   │   │   ├── Controllers/    # Un controlador por tipo de gráfico
│   │   │   └── Directives/     # Filtros dinámicos del equalizador
│   │   ├── _PagesCtrls/
│   │   │   ├── StateParentCtrl.js   # Estado padre (inicialización global)
│   │   │   └── StateChildrenCtrl.js # Estado hijo (contexto de cada página)
│   │   └── _Routes/
│   │       ├── routerConfig.js      # Configuración raíz del router
│   │       ├── routerGeneral.js
│   │       ├── routerProceso.js
│   │       ├── routerAutomocion.js
│   │       ├── routerIndustriales.js
│   │       ├── routerMarinosAviacion.js
│   │       └── routerGrasas.js
│   │
│   ├── Directives/             # Componentes UI reutilizables
│   │   ├── bookmarks/
│   │   ├── filters/
│   │   ├── contextmenu/
│   │   ├── errorsManagement/
│   │   ├── glosario/
│   │   ├── help/
│   │   ├── kpioptions/
│   │   ├── modeview/
│   │   ├── options/
│   │   ├── optionswellcome/
│   │   ├── speeldial/
│   │   └── switchlang/
│   │
│   └── Services/
│       └── getAppService.js    # Servicio de acceso a datos de Qlik
│
└── views/                      # Plantillas HTML (AngularJS)
    ├── Home/
    │   ├── wellcome.html       # Pantalla de bienvenida
    │   └── inicio.html         # Layout principal de la app
    ├── _Ventas/                # Sección de ventas
    │   ├── Dashboard.html
    │   ├── Analisis.html
    │   ├── Reporting.html
    │   ├── KPIS.html
    │   ├── Mapa.html
    │   ├── Informe.html
    │   ├── General/
    │   ├── Proceso/
    │   ├── Automocion/
    │   ├── Industriales/
    │   ├── MarinosAviacion/
    │   └── Grasas/
    └── partial/
        └── loader_qlik.html    # Spinner de carga
```

---

## Arquitectura técnica

### Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework frontend | **AngularJS** (1.x) con **UI-Router** |
| Cargador de módulos | **RequireJS** |
| DOM / Utilidades | **jQuery 3.3.1** + **jQuery UI 1.12.1** |
| UI / Grid | **Bootstrap 4** |
| Gráficos / Datos | **Qlik Sense Mashup API** |
| i18n | **angular-translate** |
| Iconos | **IcoFont** |
| Tipografía | Roboto + Montserrat |
| Efectos visuales | **Particles.js** |
| Dropdowns | **Select2** |
| Notificaciones | **jQuery Toast** |

### Patrón de la aplicación

La aplicación sigue una arquitectura **SPA (Single Page Application)** basada en estados anidados de UI-Router:

```
Estado raíz (PageController)
└── Home
    ├── wellcome            ← Pantalla de bienvenida
    └── inicio              ← Layout principal
        └── Ventas          ← Estado padre de ventas
            ├── General
            │   ├── Dashboard
            │   ├── Analisis
            │   │   ├── Detalle
            │   │   ├── Distribucion
            │   │   ├── Estacionalidad
            │   │   ├── EvolucionIndicadores
            │   │   ├── Ranking
            │   │   ├── Resumen
            │   │   ├── Tendencia
            │   │   └── DispersionComparativa
            │   ├── Reporting
            │   ├── KPIS
            │   └── Mapa
            ├── Proceso        (misma estructura)
            ├── Automocion     (misma estructura)
            ├── Industriales   (misma estructura)
            ├── MarinosAviacion (misma estructura)
            └── Grasas         (misma estructura)
```

---

## Secciones del dashboard

La aplicación está organizada en **6 líneas de producto**, cada una con las mismas sub-secciones:

| Sección | Descripción |
|---------|-------------|
| **General** | Visión global de todas las líneas |
| **Proceso** | Productos de proceso industrial |
| **Automoción** | Lubricantes y productos para automoción |
| **Industriales** | Productos industriales |
| **Marinos y Aviación** | Productos para sectores marino y aeronáutico |
| **Grasas** | Productos de lubricación (grasas) |

### Sub-secciones de cada línea

Cada línea de producto contiene las mismas vistas de análisis:

| Vista | Descripción |
|-------|-------------|
| **Dashboard** | Resumen visual con KPIs principales |
| **Análisis > Detalle** | Análisis pormenorizado de datos |
| **Análisis > Distribución** | Distribución estadística de ventas |
| **Análisis > Estacionalidad** | Patrones estacionales a lo largo del tiempo |
| **Análisis > Evolución de Indicadores** | Tendencia histórica de métricas clave |
| **Análisis > Ranking** | Clasificación de productos/clientes/regiones |
| **Análisis > Resumen** | Vista resumen ejecutivo |
| **Análisis > Tendencia** | Proyecciones y líneas de tendencia |
| **Análisis > Dispersión Comparativa** | Comparación multivariable (scatter) |
| **Reporting** | Generación de informes exportables |
| **KPIs** | Panel dedicado a indicadores clave |
| **Mapa** | Visualización geográfica de ventas |

---

## Sistema de rutas

La configuración de rutas se divide en ficheros por sección para facilitar el mantenimiento:

- [js/Controllers/_Routes/routerConfig.js](js/Controllers/_Routes/routerConfig.js) — Raíz y estados base
- [js/Controllers/_Routes/routerGeneral.js](js/Controllers/_Routes/routerGeneral.js)
- [js/Controllers/_Routes/routerProceso.js](js/Controllers/_Routes/routerProceso.js)
- [js/Controllers/_Routes/routerAutomocion.js](js/Controllers/_Routes/routerAutomocion.js)
- [js/Controllers/_Routes/routerIndustriales.js](js/Controllers/_Routes/routerIndustriales.js)
- [js/Controllers/_Routes/routerMarinosAviacion.js](js/Controllers/_Routes/routerMarinosAviacion.js)
- [js/Controllers/_Routes/routerGrasas.js](js/Controllers/_Routes/routerGrasas.js)

Cada router define los estados UI-Router con su controlador, plantilla HTML y los filtros que se inyectan dinámicamente en el panel lateral.

---

## Componentes y directivas

Todos los componentes están implementados como **directivas AngularJS** en [js/Directives/](js/Directives/):

| Directiva | Descripción |
|-----------|-------------|
| `speeldial` | Botón de acción flotante (FAB) con submenú expandible |
| `filters` | Panel lateral de filtros dinámicos (gestión por arrays) |
| `bookmarks` | Selector y gestor de marcadores de Qlik |
| `options` | Panel de configuración: tema, imagen de fondo (22 opciones) |
| `glosario` | Panel lateral de glosario/terminología del negocio |
| `help` | Sistema de ayuda con vídeos tutoriales integrados |
| `contextmenu` | Menú contextual al hacer clic derecho sobre objetos |
| `kpioptions` | Configuración individual de widgets KPI |
| `errorsManagement` | Captura y visualización de errores globales |
| `modeview` | Toggle de tema claro/oscuro (día/noche) |
| `switchlang` | Selector de idioma con banderas (ES/EN/FR) |
| `optionswellcome` | Opciones específicas de la pantalla de bienvenida |

---

## El Equalizador (configurador de gráficos)

El **Equalizador** ([js/Controllers/Equalizador/](js/Controllers/Equalizador/)) es el componente más complejo de la aplicación. Permite al usuario reconfigurar cualquier visualización en tiempo real eligiendo:

- Tipo de gráfico
- Dimensiones (ejes/categorías)
- Métricas (medidas/indicadores)

### Tipos de gráfico soportados

1. Gráfico de líneas (`linechartCtrl.js`)
2. Gráfico de barras (`barchartCtrl.js`)
3. Gráfico de dispersión / Scatter plot (`scatterplotCtrl.js`)
4. Gráfico circular / Pie chart (`piechartCtrl.js`)
5. Box Plot (`boxplotCtrl.js`)
6. Distribution Plot (`distributionplotCtrl.js`)
7. Histograma (`histogramCtrl.js`)
8. Combo Chart (`combochartCtrl.js`)
9. Mapa (`mapCtrl.js`)
10. Treemap (`treemapCtrl.js`)
11. Tabla (`tableCtrl.js`)
12. Tabla dinámica / Pivot Table (`pivotTableCtrl.js`)

---

## Internacionalización (i18n)

La aplicación soporta tres idiomas gestionados con **angular-translate**:

| Código | Idioma | Fichero de traducciones |
|--------|--------|------------------------|
| `es` | Español (por defecto) | `traducciones_es.js` |
| `en` | Inglés | `traducciones_en.js` |
| `fr` | Francés | `traducciones_fr.js` |

El cambio de idioma también actualiza la variable de Qlik `lang` para que los campos multilingüe del modelo de datos respondan al idioma seleccionado. Los campos multilingüe se identifican con el sufijo `_Idioma`.

El selector de idioma está disponible en todo momento a través de la directiva `switchlang`.

---

## Temas y estilos

### Temas

La directiva `options` permite al usuario elegir entre **22 temas visuales** predefinidos. El tema activo se almacena en sesión y se aplica dinámicamente via la API de temas de Qlik (`theme.apply()`).

### Modo oscuro / claro

El toggle día/noche (`modeview`) carga o descarga [css/estilos/dark.css](css/estilos/dark.css) dinámicamente sobre los estilos base.

### Imágenes de fondo

La carpeta [assets/img/bg/](assets/img/bg/) contiene más de 20 imágenes de fondo intercambiables desde el panel de opciones.

### Diseño responsivo

Se usan clases de Bootstrap 4 combinadas con ficheros CSS de media queries propios para soportar dispositivos desde móvil hasta pantallas extra grandes:

```
media-queries-xs.css   → Extra small  (< 576px)
media-queries-sm.css   → Small        (≥ 576px)
media-queries-md.css   → Medium       (≥ 768px)
media-queries-lg.css   → Large        (≥ 992px)
media-queries-xl.css   → Extra large  (≥ 1200px)
```

También se incluyen clases de altura personalizadas (`mzh-*`) para control preciso de contenedores.

---

## Configuración inicial

El fichero principal de configuración es [js/Controllers/InitConfig.js](js/Controllers/InitConfig.js). Editar los siguientes valores antes del primer despliegue:

```javascript
{
  demo: true,              // true = modo demo, false = producción
  language: 'es',          // Idioma por defecto: 'es', 'en', 'fr'
  multilanguage: true,     // Activar/desactivar soporte multilingüe
  darkView: true,          // true = tema oscuro al arrancar

  // ID de la aplicación Qlik Sense (nombre o UUID)
  appVentas: 'ASELUBE',    // Cambiar por el UUID de la app en el servidor

  // Configuración de temas
  ThemesInit: '...',       // Tema por defecto al arrancar
  ThemesImage: '...'       // Imagen de fondo por defecto
}
```

> **Importante:** En entornos de servidor, `appVentas` debe ser el **UUID** de la aplicación Qlik, no su nombre. El UUID se obtiene desde la URL de la app en el Qlik Sense Hub.

---

## Integración con Qlik Sense

### Cómo se conecta la app a Qlik

El servicio [js/Services/getAppService.js](js/Services/getAppService.js) centraliza el acceso a la API de Qlik:

```javascript
// Apertura de la aplicación
qlik.openApp(appId, config)

// Carga de una visualización por ID de objeto
app.getObject(elementId, objectId)

// Acceso a una visualización específica
app.visualization.get(objectId)

// Obtener listas (dimensiones, medidas, campos)
app.getList('DimensionList', callback)
app.getList('MeasureList', callback)

// Variables de Qlik
app.variable.getContent(varName, callback)
app.variable.setStringValue(varName, value)

// Selecciones en campos
app.field(fieldName).getData()
app.field(fieldName).selectValues(values)

// Temas
qlik.theme.apply(themeName)
```

### Selecciones actuales

El componente de selecciones actuales (`box-current-selections`) muestra los filtros activos del usuario en tiempo real, sincronizado automáticamente con el motor de asociaciones de Qlik.

### Marcadores

La directiva `bookmarks` permite al usuario guardar y recuperar estados de selección completos usando la API de bookmarks de Qlik.

---

## Flujo de arranque

El arranque de la aplicación sigue esta cadena de inicialización:

```
index.html
  └── Carga RequireJS
        └── require-config.js  (define paths y shims)
              └── main.js       (carga todos los módulos Angular)
                    └── app.js  (registra el módulo principal y directivas)
                          └── UI-Router navega al estado inicial
                                └── Home.wellcome  (pantalla de bienvenida)
                                      └── [usuario navega]
                                            └── Home.inicio → Ventas.*
```

Los controladores `StateParentCtrl` y `StateChildrenCtrl` gestionan el ciclo de vida de cada estado: inicialización de la conexión con Qlik, carga de objetos, gestión de filtros y limpieza al abandonar el estado.
