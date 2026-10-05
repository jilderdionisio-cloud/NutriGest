import { useEffect, useState } from 'react'
import { X, MessageCircle } from 'lucide-react'
import { getActiveCampaigns } from '../../services/campaignsService'
import { DEFAULT_WHATSAPP_NUMBER, openWhatsApp } from '../../utils/whatsapp'

const DEFAULT_CAMPAIGN_WHATSAPP_MESSAGE = 'Hola, deseo más información sobre esta campaña de NutriGest.'

// La campaña se promociona con un flyer visual, como en una clínica real.
// Título y fechas se guardan y se usan solo internamente (alt/aria-label),
// sin ocupar espacio visual: el flyer es el elemento principal, seguido de
// una barra de WhatsApp, y al hacer clic se abre WhatsApp para contactar a
// la clínica.
function getCampaignTitle(campaign) {
  return (campaign?.titulo || '').trim()
}

function getCampaignImage(campaign) {
  return (campaign?.imagenUrl || campaign?.imagen_url || '').trim()
}

function getCampaignDate(campaign) {
  return new Date(campaign?.createdAt || campaign?.created_at || 0).getTime() || 0
}

function selectCampaign(campaigns) {
  return [...campaigns]
    .filter((campaign) => getCampaignTitle(campaign) && getCampaignImage(campaign))
    .sort((firstCampaign, secondCampaign) => {
      const firstPriority = Number(firstCampaign.prioridad ?? firstCampaign.priority ?? 0)
      const secondPriority = Number(secondCampaign.prioridad ?? secondCampaign.priority ?? 0)

      if (secondPriority !== firstPriority) {
        return secondPriority - firstPriority
      }

      const dateDifference = getCampaignDate(secondCampaign) - getCampaignDate(firstCampaign)
      if (dateDifference !== 0) {
        return dateDifference
      }

      return Number(secondCampaign.id ?? 0) - Number(firstCampaign.id ?? 0)
    })[0] || null
}

export default function CampaignPopup({ page = 'HOME' }) {
  const [campaign, setCampaign] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let mounted = true

    async function loadCampaigns() {
      try {
        const campaigns = await getActiveCampaigns(page)
        const nextCampaign = selectCampaign(campaigns)

        if (!mounted) {
          return
        }

        const showOnce = Boolean(nextCampaign?.mostrar_una_vez_por_sesion ?? nextCampaign?.mostrarUnaVezPorSesion)
        const sessionKey = nextCampaign ? `campaign-popup-shown-${nextCampaign.id}` : ''
        if (showOnce && sessionKey && window.sessionStorage.getItem(sessionKey) === 'true') {
          setCampaign(null)
          setOpen(false)
          return
        }

        if (showOnce && sessionKey) {
          window.sessionStorage.setItem(sessionKey, 'true')
        }

        setCampaign(nextCampaign)
        setOpen(Boolean(nextCampaign))
      } catch {
        if (mounted) {
          setCampaign(null)
          setOpen(false)
        }
      }
    }

    loadCampaigns()

    return () => {
      mounted = false
    }
  }, [page])

  const handleClose = () => {
    setOpen(false)
  }

  const handleCampaignClick = () => {
    const numero = campaign.whatsapp_numero || DEFAULT_WHATSAPP_NUMBER
    const mensaje = campaign.whatsapp_mensaje || DEFAULT_CAMPAIGN_WHATSAPP_MESSAGE

    openWhatsApp(mensaje, numero)
  }

  if (!open || !campaign) {
    return null
  }

  const titulo = getCampaignTitle(campaign)
  const flyerUrl = getCampaignImage(campaign)

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4" onClick={handleClose}>
      <div className="relative w-[94vw] max-w-[620px]" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="absolute -right-4 -top-4 z-10 grid h-10 w-10 place-items-center rounded-full border-0 bg-[#167EA8] text-white shadow-[0_12px_28px_rgba(15,23,42,0.25)] transition hover:bg-[#466f31]"
          onClick={(event) => {
            event.stopPropagation()
            handleClose()
          }}
          aria-label="Cerrar campaña"
        >
          <X size={20} strokeWidth={2.4} />
        </button>

        <button
          type="button"
          onClick={handleCampaignClick}
          className="block w-full cursor-pointer overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-[0_24px_70px_rgba(15,23,42,0.32)]"
          aria-label={`${titulo}. Toca para agendar por WhatsApp`}
        >
          <img
            className="block h-auto w-full"
            src={flyerUrl}
            alt={titulo}
          />
          <span className="flex w-full items-center justify-center gap-2 bg-[#4f7f35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3b5f29]">
            <MessageCircle size={18} />
            Agenda hoy por WhatsApp
          </span>
        </button>
      </div>
    </div>
  )
}
