import React, { useState, useEffect } from 'react';
import { Save, Loader2, LayoutTemplate, Plus, X } from 'lucide-react';
import { triggerToast } from './CmsToaster';
import { githubApi } from '../../lib/adminApi';

const FILE_PATH = 'src/data/about.json';

const DEFAULT: any = {
    title: 'Sobre Nós',
    intro: { title: '', description: '', image: '', features: [] as string[] },
    mission: { title: 'Nossa Missão', description: '' },
    vision: { title: 'Nossa Visão', description: '' },
};

export default function SobreEditor() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState<any>(null);
    const [fileSha, setFileSha] = useState('');
    const [pendingImage, setPendingImage] = useState<File | null>(null);

    useEffect(() => {
        githubApi('read', FILE_PATH)
            .then((d: any) => {
                const parsed = JSON.parse(d?.content || '{}');
                setData({ ...DEFAULT, ...parsed, intro: { ...DEFAULT.intro, ...(parsed.intro || {}) }, mission: { ...DEFAULT.mission, ...(parsed.mission || {}) }, vision: { ...DEFAULT.vision, ...(parsed.vision || {}) } });
                setFileSha(d.sha);
            })
            .catch(err => { setError(err.message); setData(DEFAULT); })
            .finally(() => setLoading(false));
    }, []);

    const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve((r.result as string).split(',')[1]);
        r.onerror = reject;
        r.readAsDataURL(file);
    });

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true); setError('');
        triggerToast('Salvando Sobre...', 'progress', 20);
        try {
            const final = { ...data };
            if (pendingImage) {
                const b64 = await fileToBase64(pendingImage);
                const ghPath = `public/uploads/${Date.now()}-about.${pendingImage.name.split('.').pop() || 'jpg'}`;
                await githubApi('write', ghPath, { content: b64, isBase64: true, message: `Upload imagem about` });
                final.intro.image = ghPath.replace('public', '');
            }
            const res = await githubApi('write', FILE_PATH, { content: JSON.stringify(final, null, 2), sha: fileSha, message: 'CMS: Pagina Sobre atualizada' });
            setFileSha(res.sha); setData(final); setPendingImage(null);
            triggerToast('Pagina Sobre atualizada!', 'success', 100);
        } catch (err: any) { setError(err.message); triggerToast(`Erro: ${err.message}`, 'error'); }
        finally { setSaving(false); }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-32 text-slate-400 bg-white rounded-2xl border border-slate-200">
            <LayoutTemplate className="w-10 h-10 animate-pulse mb-6 text-slate-300" />
            <p className="font-semibold text-sm animate-pulse text-slate-500">Buscando about.json...</p>
        </div>
    );

    const cardClass = "p-8 mb-6 bg-white border border-slate-200 rounded-2xl shadow-sm";
    const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm";
    const labelClass = "block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1";

    const setField = (section: string | null, key: string, value: any) => {
        setData((d: any) => section ? { ...d, [section]: { ...(d[section] || {}), [key]: value } } : { ...d, [key]: value });
    };

    return (
        <div className="max-w-4xl space-y-0 pb-32">
            <div className="flex items-center justify-between bg-white p-4 px-6 rounded-2xl border border-slate-200 shadow-sm mb-6 sticky top-4 z-10">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Editar Pagina: Sobre Nos</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Edita o arquivo <code className="bg-slate-100 px-1 rounded">{FILE_PATH}</code></p>
                </div>
                <button onClick={handleSave} disabled={saving} className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Salvando...' : 'Salvar'}
                </button>
            </div>

            {error && <div className="p-3 bg-red-50 text-red-700 border-l-4 border-red-500 text-sm font-medium mb-4">{error}</div>}

            <form onSubmit={handleSave} className="space-y-6">
                <div className={cardClass}>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Cabecalho</h3>
                    <div><label className={labelClass}>Titulo da pagina</label><input type="text" value={data?.title || ''} onChange={e => setField(null, 'title', e.target.value)} className={inputClass} /></div>
                </div>

                <div className={cardClass}>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">1. Apresentacao (Intro)</h3>
                    <div className="space-y-4">
                        <div><label className={labelClass}>Titulo</label><input type="text" value={data?.intro?.title || ''} onChange={e => setField('intro', 'title', e.target.value)} className={inputClass} /></div>
                        <div><label className={labelClass}>Descricao</label><textarea rows={4} value={data?.intro?.description || ''} onChange={e => setField('intro', 'description', e.target.value)} className={`${inputClass} resize-y`} /></div>
                        <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
                            <label className={labelClass}>Imagem</label>
                            <input type="file" accept="image/*" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer" onChange={e => { const f = e.target.files?.[0]; if (f) { setPendingImage(f); setField('intro', 'image', URL.createObjectURL(f)); } e.target.value = ''; }} />
                            {data?.intro?.image && <div className="mt-4 w-full h-[200px] border border-slate-300 rounded overflow-hidden"><img src={data.intro.image} className="w-full h-full object-cover" /></div>}
                        </div>
                        <div>
                            <label className={labelClass}>Pontos Fortes (Features)</label>
                            <div className="space-y-2">
                                {(data?.intro?.features || []).map((f: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                        <input type="text" value={f} onChange={e => { const arr = [...data.intro.features]; arr[i] = e.target.value; setField('intro', 'features', arr); }} className={inputClass} />
                                        <button type="button" onClick={() => setField('intro', 'features', data.intro.features.filter((_: any, j: number) => j !== i))} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl"><X className="w-4 h-4" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setField('intro', 'features', [...(data?.intro?.features || []), ''])} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-violet-600 hover:bg-violet-50 rounded-xl"><Plus className="w-4 h-4" /> Adicionar feature</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cardClass}>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">2. Missao</h3>
                    <div className="space-y-4">
                        <div><label className={labelClass}>Titulo</label><input type="text" value={data?.mission?.title || ''} onChange={e => setField('mission', 'title', e.target.value)} className={inputClass} /></div>
                        <div><label className={labelClass}>Descricao</label><textarea rows={4} value={data?.mission?.description || ''} onChange={e => setField('mission', 'description', e.target.value)} className={`${inputClass} resize-y`} /></div>
                    </div>
                </div>

                <div className={cardClass}>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">3. Visao</h3>
                    <div className="space-y-4">
                        <div><label className={labelClass}>Titulo</label><input type="text" value={data?.vision?.title || ''} onChange={e => setField('vision', 'title', e.target.value)} className={inputClass} /></div>
                        <div><label className={labelClass}>Descricao</label><textarea rows={4} value={data?.vision?.description || ''} onChange={e => setField('vision', 'description', e.target.value)} className={`${inputClass} resize-y`} /></div>
                    </div>
                </div>
            </form>
        </div>
    );
}
