const KEY = 'nutrigest-contact-requests-demo'
export function getContactRequests(){try{const value=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(value)?value:[]}catch{return []}}
export function saveContactRequest(request){const saved={...request,id:`request-${crypto.randomUUID?.()??Date.now()}`,status:'Nueva',submittedAt:new Date().toISOString(),source:'local-demo'};localStorage.setItem(KEY,JSON.stringify([saved,...getContactRequests()]));return saved}
export function updateContactRequest(id,changes){const next=getContactRequests().map((item)=>item.id===id?{...item,...changes}:item);localStorage.setItem(KEY,JSON.stringify(next));return next.find((item)=>item.id===id)}
