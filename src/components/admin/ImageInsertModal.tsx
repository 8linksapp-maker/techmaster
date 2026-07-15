import React, { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

interface ImageInsertModalProps {
    open: boolean;
    onClose: () => void;
    onInsert: (dataUrl: string, alt: string, caption: string) => void;
}

export default function ImageInsertModal({ open, onClose, onInsert }: ImageInsertModalProps) {
    const [dataUrl, setDataUrl] = useState('');
    const [alt, setAlt] = useState('');
    const [caption, setCaption] = useState('');

    const reset = () => { setDataUrl(''); setAlt(''); setCaption(''); };
    const close = () => { reset(); onClose(); };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setDataUrl(reader.result as string);
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const confirm = () => {
        if (!dataUrl) return;
        onInsert(dataUrl, alt.trim(), caption.trim());
        reset();
    };

    if (!open) return null;

    const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm";
    const labelClass = "block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1";
    const hintClass = "text-xs text-slate-400 mt-1.5 ml-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800">Inserir imagem no artigo</h3>
                    <button type="button" onClick={close} className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-5">
                    <div>
                        <label className={labelClass}>Imagem *</label>
                        <label className="group relative border-2 border-dashed border-slate-200 hover:border-violet-400 bg-slate-50 hover:bg-violet-50 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all text-center overflow-hidden" style={{ minHeight: '160px' }}>
                            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                            {dataUrl ? (
                                <>
                                    <img src={dataUrl} alt="Pré-visualização" className="absolute inset-0 w-full h-full object-contain bg-slate-100 group-hover:opacity-60 transition-opacity" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/20">
                                        <ImageIcon className="w-8 h-8 text-slate-800" />
                                        <span className="text-xs font-bold text-slate-900 mt-1">Trocar imagem</span>
                                    </div>
                                </>
                            ) : (
                                <div className="py-8 flex flex-col items-center text-slate-400 group-hover:text-violet-500 transition-colors">
                                    <ImageIcon className="w-8 h-8 mb-2" />
                                    <span className="text-xs font-bold">Enviar imagem do computador</span>
                                </div>
                            )}
                        </label>
                    </div>
                    <div>
                        <label className={labelClass}>Texto alternativo (alt)</label>
                        <input type="text" value={alt} onChange={e => setAlt(e.target.value)} className={inputClass} placeholder="Ex: Gráfico mostrando o crescimento das vendas" />
                        <p className={hintClass}>Descreve a imagem pra leitor de tela e SEO. Deixe vazio só se for puramente decorativa.</p>
                    </div>
                    <div>
                        <label className={labelClass}>Legenda</label>
                        <input type="text" value={caption} onChange={e => setCaption(e.target.value)} className={inputClass} placeholder="Ex: Fonte: relatório anual 2025" />
                        <p className={hintClass}>Aparece abaixo da imagem no artigo.</p>
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end rounded-b-3xl">
                    <button type="button" onClick={close} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">Cancelar</button>
                    <button type="button" onClick={confirm} disabled={!dataUrl} className="px-6 py-2.5 text-sm font-bold bg-violet-600 hover:bg-violet-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white disabled:text-slate-400 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Inserir
                    </button>
                </div>
            </div>
        </div>
    );
}
