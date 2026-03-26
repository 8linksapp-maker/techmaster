import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, Loader2, Image as ImageIcon, Upload, Globe, Share2, Mail, Palette, Type, CheckCircle2, X } from 'lucide-react';
import { triggerToast } from './CmsToaster';
import { githubApi } from '../../lib/adminApi';

export default function ConfigEditor() {
    const [config, setConfig] = useState<any>(null);
    const [fileSha, setFileSha] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pendingLogo, setPendingLogo] = useState<File | null>(null);

    const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });

    useEffect(() => {
        async function load() {
            try {
                const data = await githubApi('read', 'src/data/siteConfig.json');
                setConfig(JSON.parse(data.content));
                setFileSha(data.sha);
            } catch (err) {
                console.error('Erro ao carregar siteConfig', err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            let configCopy = { ...config };
            if (pendingLogo) {
                const base64 = await fileToBase64(pendingLogo);
                const ext = pendingLogo.name.split('.').pop() || 'png';
                const filename = `logo-${Date.now()}.${ext}`;
                const path = `public/uploads/${filename}`;
                await githubApi('write', path, { content: base64, isBase64: true });
                configCopy.logo = `/uploads/${filename}`;
            }

            const res = await githubApi('write', 'src/data/siteConfig.json', {
                content: JSON.stringify(configCopy, null, 4),
                sha: fileSha
            });

            setFileSha(res.sha);
            setConfig(configCopy);
            setPendingLogo(null);
            triggerToast('Configurações Globais atualizadas!', 'success');
        } catch (err: any) {
            triggerToast(`Erro: ${err.message}`, 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto w-10 h-10 text-violet-500" /></div>;

    const inputClass = "w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-sm";
    const labelClass = "block text-xs font-bold text-slate-500 uppercase mb-2";

    return (
        <form onSubmit={save} className="max-w-4xl space-y-8 pb-32">
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-4 z-40">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Configurações do Site</h2>
                    <p className="text-sm text-slate-500">Logo, Redes Sociais e Rodapé</p>
                </div>
                <button type="submit" disabled={saving} className="bg-violet-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-violet-700 shadow-md">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Salvando...' : 'Salvar Tudo'}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* IDENTIDADE */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <h3 className="font-bold flex items-center gap-2 text-violet-600 border-b pb-4"><Globe className="w-5 h-5" /> Identidade</h3>
                    <div>
                        <label className={labelClass}>Nome do Blog</label>
                        <input type="text" value={config.name} onChange={e => setConfig({ ...config, name: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Descrição do Site (Geral / Sidebar)</label>
                        <textarea rows={3} value={config.description} onChange={e => setConfig({ ...config, description: e.target.value })} className={inputClass} placeholder="Breve resumo sobre o site..." />
                    </div>
                    <div>
                        <label className={labelClass}>Logo (Upload)</label>
                        <div className="flex items-center gap-4">
                            {config.logo && (
                                <div className="relative group self-start">
                                    <div className="bg-slate-50 p-2 border rounded-xl overflow-hidden shadow-sm">
                                        <img src={config.logo} className="h-10 w-auto object-contain" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setConfig({ ...config, logo: '' })}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remover Logo"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            <label className="flex-1 flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 text-[10px] font-bold justify-center transition-all">
                                <Upload className="w-4 h-4" /> {config.logo ? 'Trocar Logo' : 'Enviar Logo'}
                                <input type="file" className="hidden" onChange={e => setPendingLogo(e.target.files?.[0] || null)} />
                            </label>
                        </div>
                        {pendingLogo && <p className="mt-2 text-[10px] text-violet-600 font-bold italic flex items-center gap-1"><Save className="w-3 h-3" /> Nova logo selecionada: {pendingLogo.name}</p>}

                        <div className="mt-6 flex gap-3 p-4 bg-violet-50 rounded-2xl border border-violet-100 italic">
                            <AlertCircle className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                            <div className="text-[10px] text-violet-700 leading-relaxed font-medium">
                                <p className="font-bold mb-1 uppercase tracking-wider">Dicas para a Logo:</p>
                                <ul className="space-y-1">
                                    <li>• Use <strong>PNG Transparente</strong> ou <strong>SVG</strong> para evitar bordas brancas.</li>
                                    <li>• Formato <strong>Horizontal</strong> (aprox. 200x50px) funciona melhor.</li>
                                    <li>• Prefira cores escuras para contraste com o Header claro.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* REDES SOCIAIS */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <h3 className="font-bold flex items-center gap-2 text-blue-500 border-b pb-4"><Share2 className="w-5 h-5" /> Redes Sociais</h3>
                    {['instagram', 'facebook', 'twitter', 'linkedin'].map(s => (
                        <div key={s}>
                            <label className={labelClass}>{s}</label>
                            <input type="text" value={config.social?.[s] || ''} onChange={e => setConfig({ ...config, social: { ...config.social, [s]: e.target.value } })} className={inputClass} placeholder="https://..." />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
                <h3 className="font-bold flex items-center gap-2 text-fuchsia-600 border-b pb-4"><Palette className="w-5 h-5" /> Customização Visual</h3>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* CORES */}
                    <div className="space-y-6">
                        <label className={labelClass}>Paleta de Cores</label>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {[
                                { name: 'Bunzo Original', p: '#8e61b9', s: '#ffb16e' },
                                { name: 'Vasco/Clean', p: '#000000', s: '#ff0000' },
                                { name: 'Ocean Tech', p: '#0f172a', s: '#38bdf8' },
                                { name: 'Forest Mint', p: '#064e3b', s: '#10b981' },
                                { name: 'Midnight Berry', p: '#4c1d95', s: '#f472b6' },
                                { name: 'Sunset Bloom', p: '#ea580c', s: '#facc15' }
                            ].map(palette => (
                                <button
                                    key={palette.name}
                                    type="button"
                                    onClick={() => setConfig({ ...config, theme: { ...config.theme, primary: palette.p, accent: palette.s } })}
                                    className={`flex items-center gap-2 p-2 rounded-xl border transition-all text-[10px] font-bold ${config.theme?.primary === palette.p && config.theme?.accent === palette.s ? 'border-violet-500 bg-violet-50' : 'border-slate-100 hover:border-slate-300'}`}
                                >
                                    <div className="flex -space-x-1">
                                        <div className="w-4 h-4 rounded-full border border-white" style={{ background: palette.p }}></div>
                                        <div className="w-4 h-4 rounded-full border border-white" style={{ background: palette.s }}></div>
                                    </div>
                                    {palette.name}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Cor Primária</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" value={config.theme?.primary || '#8e61b9'} onChange={e => setConfig({ ...config, theme: { ...config.theme, primary: e.target.value } })} className="w-10 h-10 rounded-lg cursor-pointer border-none p-0" />
                                    <input type="text" value={config.theme?.primary || ''} onChange={e => setConfig({ ...config, theme: { ...config.theme, primary: e.target.value } })} className="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-xs font-mono" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Cor Secundária</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" value={config.theme?.accent || '#ffb16e'} onChange={e => setConfig({ ...config, theme: { ...config.theme, accent: e.target.value } })} className="w-10 h-10 rounded-lg cursor-pointer border-none p-0" />
                                    <input type="text" value={config.theme?.accent || ''} onChange={e => setConfig({ ...config, theme: { ...config.theme, accent: e.target.value } })} className="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-xs font-mono" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FONTES */}
                    <div className="space-y-6">
                        <label className={labelClass}><Type className="w-4 h-4 inline mr-1" /> Combinações de Fontes</label>
                        <div className="space-y-3">
                            {[
                                { id: 'poppins', name: 'Standard (Poppins + Roboto)', desc: 'Equilibrada e moderna' },
                                { id: 'inter', name: 'Minimalist (Inter)', desc: 'Limpa e profissional' },
                                { id: 'lexend', name: 'Friendly (Lexend + Inter)', desc: 'Leitura fácil e convidativa' },
                                { id: 'playfair', name: 'Editorial (Playfair + Source)', desc: 'Elegante e sofisticada' },
                                { id: 'outfit', name: 'Dynamic (Outfit + Open Sans)', desc: 'Moderna e vibrante' }
                            ].map(fontPair => (
                                <button
                                    key={fontPair.id}
                                    type="button"
                                    onClick={() => setConfig({ ...config, theme: { ...config.theme, font: fontPair.id } })}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all relative ${config.theme?.font === fontPair.id ? 'border-violet-500 bg-violet-50/50 ring-1 ring-violet-500' : 'border-slate-100 hover:border-slate-200'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-sm text-slate-800">{fontPair.name}</p>
                                            <p className="text-[10px] text-slate-400">{fontPair.desc}</p>
                                        </div>
                                        {config.theme?.font === fontPair.id && <CheckCircle2 className="w-5 h-5 text-violet-500" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* RODAPÉ */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold flex items-center gap-2 text-emerald-600 border-b pb-4 mb-6"><Mail className="w-5 h-5" /> Configuração do Rodapé (Footer)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Título Newsletter Rodapé</label>
                        <input type="text" value={config.footer?.subscribeTitle} onChange={e => setConfig({ ...config, footer: { ...config.footer, subscribeTitle: e.target.value } })} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Texto Botão Rodapé</label>
                        <input type="text" value={config.footer?.subscribeBtn} onChange={e => setConfig({ ...config, footer: { ...config.footer, subscribeBtn: e.target.value } })} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Título Coluna 1</label>
                        <input type="text" value={config.footer?.col1Title} onChange={e => setConfig({ ...config, footer: { ...config.footer, col1Title: e.target.value } })} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Título Coluna 2</label>
                        <input type="text" value={config.footer?.col2Title} onChange={e => setConfig({ ...config, footer: { ...config.footer, col2Title: e.target.value } })} className={inputClass} />
                    </div>
                    <div className="md:col-span-2">
                        <label className={labelClass}>Texto de Copyright</label>
                        <input type="text" value={config.footer?.copyright} onChange={e => setConfig({ ...config, footer: { ...config.footer, copyright: e.target.value } })} className={inputClass} />
                    </div>
                </div>
            </div>
        </form>
    );
}
