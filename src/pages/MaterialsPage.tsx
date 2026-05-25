import { Filter, X, Grid, ArrowUpDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { Material } from "../types";

export default function MaterialsPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [loading, setLoading] = useState(true);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
        null,
    );
    const [selectedColor, setSelectedColor] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("name");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        async function loadMaterials() {
            try {
                const { data, error } = await supabase
                    .from("materials")
                    .select("*");

                if (error) throw error;
                setMaterials(data || []);
            } catch (error) {
                console.error("Error loading materials:", error);
            } finally {
                setLoading(false);
            }
        }
        loadMaterials();
    }, []);

    const categories = useMemo(() => {
        if (materials.length === 0) return [];

        const countsMap = materials.reduce(
            (acc, material) => {
                acc[material.category] = (acc[material.category] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>,
        );

        const sortedCategories = Object.keys(countsMap)
            .sort((a, b) => a.localeCompare(b))
            .map((cat) => ({ category: cat, count: countsMap[cat] }));

        return [
            { category: "ALL", count: materials.length },
            ...sortedCategories,
        ];
    }, [materials]);

    const availableColors = useMemo(() => {
        if (materials.length === 0) return ["all"];

        const uniqueColors = Array.from(
            new Set(
                materials
                    .map((m) => m.color?.toLowerCase().trim())
                    .filter(Boolean),
            ),
        ).sort();

        return ["all", ...uniqueColors];
    }, [materials]);

    const filteredMaterials = useMemo(() => {
        let result =
            selectedCategory === "ALL"
                ? [...materials]
                : materials.filter((m) => m.category === selectedCategory);

        if (selectedColor !== "all") {
            result = result.filter(
                (m) => m.color?.toLowerCase().trim() === selectedColor,
            );
        }

        return result.sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "name-desc") return b.name.localeCompare(a.name);
            return 0;
        });
    }, [materials, selectedCategory, selectedColor, sortBy]);

    return (
        <div className='min-h-screen bg-[#faf9f6] text-stone-900 font-sans antialiased'>
            {/* HERO SECTION - INDUSTRIAL BOUTIQUE AESTHETIC */}
            <div className='relative bg-[#1a111e] text-white py-24 border-b border-stone-800 overflow-hidden'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,38,68,0.6),transparent)]' />
                <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                    <span className='text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold inline-block mb-3'>
                        Koleksioni Ekskluziv
                    </span>
                    <h1 className='text-4xl md:text-6xl font-light tracking-tight mb-4 font-serif'>
                        Materiale{" "}
                        <span className='italic text-stone-300'>Premium</span>
                    </h1>
                    <p className='text-md md:text-lg text-stone-400 max-w-xl mx-auto font-light leading-relaxed tracking-wide'>
                        Një përzgjedhje e curuar e mermerit dhe gurit natyror me
                        kualitet të lartë për projekte arkitekturore unike.
                    </p>
                </div>
            </div>

            {/* LOADING STATE */}
            {loading ? (
                <div className='text-center py-32'>
                    <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500'></div>
                </div>
            ) : (
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
                        {/* SIDEBAR NAVIGATION */}
                        <div className='lg:col-span-1'>
                            <div className='sticky top-28 space-y-6'>
                                <div>
                                    <h2 className='text-xs uppercase tracking-[0.2em] text-stone-400 font-bold mb-4'>
                                        Kategoritë
                                    </h2>
                                    <div className='space-y-1 border-l border-stone-200 pl-2'>
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.category}
                                                onClick={() => {
                                                    setSelectedCategory(
                                                        cat.category,
                                                    );
                                                    setSelectedColor("all");
                                                }}
                                                className={`w-full flex justify-between items-center text-left px-3 py-2 text-sm tracking-wide transition-all duration-200 relative ${
                                                    selectedCategory ===
                                                    cat.category
                                                        ? "text-[#3b2644] font-semibold translate-x-1"
                                                        : "text-stone-500 hover:text-stone-900 hover:translate-x-1"
                                                }`}
                                            >
                                                <span>{cat.category}</span>
                                                <span className='text-xs text-stone-400 font-mono'>
                                                    ({cat.count})
                                                </span>
                                                {selectedCategory ===
                                                    cat.category && (
                                                    <span className='absolute left-[-9px] top-1/2 -translate-y-1/2 w-[3px] h-4 bg-amber-500 rounded-full' />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MAIN CONTENT AREA */}
                        <div className='lg:col-span-3 space-y-8'>
                            {/* REFINED FILTER CONTROLS */}
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-stone-200 gap-4'>
                                <div>
                                    <h2 className='text-xl tracking-tight font-serif capitalize mb-1'>
                                        {selectedCategory.toLowerCase()}
                                    </h2>
                                    <p className='text-xs tracking-wide text-stone-500 font-light font-mono'>
                                        {filteredMaterials.length}{" "}
                                        {filteredMaterials.length === 1
                                            ? "artikull"
                                            : "artikuj"}{" "}
                                        i disponueshëm
                                    </p>
                                </div>

                                <div className='flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end'>
                                    {/* Mobile Filter Trigger */}
                                    <button
                                        onClick={() =>
                                            setShowFilters(!showFilters)
                                        }
                                        className='md:hidden flex items-center gap-2 text-xs uppercase tracking-wider text-stone-700 bg-white px-4 py-2.5 border border-stone-200 rounded shadow-sm'
                                    >
                                        <Filter size={14} /> Filtrat
                                    </button>

                                    {/* Desktop Filters */}
                                    <div className='hidden md:flex items-center gap-6'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-xs tracking-wider text-stone-400 uppercase'>
                                                Ngjyra:
                                            </span>
                                            <select
                                                value={selectedColor}
                                                onChange={(e) =>
                                                    setSelectedColor(
                                                        e.target.value,
                                                    )
                                                }
                                                className='text-xs uppercase tracking-wider bg-transparent border-b border-stone-300 py-1 focus:outline-none focus:border-amber-500 cursor-pointer text-stone-700'
                                            >
                                                {availableColors.map(
                                                    (color) => (
                                                        <option
                                                            key={color}
                                                            value={color}
                                                        >
                                                            {color === "all"
                                                                ? "Të gjitha"
                                                                : color}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            <span className='text-xs tracking-wider text-stone-400 uppercase'>
                                                Rendit:
                                            </span>
                                            <select
                                                value={sortBy}
                                                onChange={(e) =>
                                                    setSortBy(e.target.value)
                                                }
                                                className='text-xs uppercase tracking-wider bg-transparent border-b border-stone-300 py-1 focus:outline-none focus:border-amber-500 cursor-pointer text-stone-700'
                                            >
                                                <option value='name'>
                                                    Emri (A-Z)
                                                </option>
                                                <option value='name-desc'>
                                                    Emri (Z-A)
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MOBILE FILTERS DRAWER */}
                            {showFilters && (
                                <div className='md:hidden grid grid-cols-2 gap-4 bg-white p-4 rounded-lg border border-stone-200 animate-fadeIn'>
                                    <div>
                                        <label className='block text-[10px] uppercase tracking-wider text-stone-400 mb-1'>
                                            Ngjyra
                                        </label>
                                        <select
                                            value={selectedColor}
                                            onChange={(e) =>
                                                setSelectedColor(e.target.value)
                                            }
                                            className='w-full text-xs bg-stone-50 border border-stone-200 rounded p-2 focus:outline-none focus:border-amber-500'
                                        >
                                            {availableColors.map((color) => (
                                                <option
                                                    key={color}
                                                    value={color}
                                                >
                                                    {color}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className='block text-[10px] uppercase tracking-wider text-stone-400 mb-1'>
                                            Renditja
                                        </label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) =>
                                                setSortBy(e.target.value)
                                            }
                                            className='w-full text-xs bg-stone-50 border border-stone-200 rounded p-2 focus:outline-none focus:border-amber-500'
                                        >
                                            <option value='name'>A-Z</option>
                                            <option value='name-desc'>
                                                Z-A
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* MATERIAL MINIMAL GRID */}
                            {filteredMaterials.length > 0 ? (
                                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
                                    {filteredMaterials.map((material) => (
                                        <div
                                            key={material.id}
                                            onClick={() =>
                                                setSelectedMaterial(material)
                                            }
                                            className='group bg-white border border-stone-200/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'
                                        >
                                            <div className='h-64 overflow-hidden bg-stone-100 relative'>
                                                <img
                                                    src={material.image_url}
                                                    alt={material.name}
                                                    className='w-full h-full object-cover filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700 ease-out'
                                                    loading='lazy'
                                                />
                                                <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300' />
                                            </div>
                                            <div className='p-5 space-y-1.5'>
                                                <div className='flex items-baseline justify-between gap-4'>
                                                    <h3 className='font-serif text-md tracking-tight group-hover:text-amber-600 transition-colors duration-200'>
                                                        {material.name}
                                                    </h3>
                                                    <span className='text-[10px] tracking-widest font-mono uppercase text-stone-400 whitespace-nowrap'>
                                                        {material.category}
                                                    </span>
                                                </div>
                                                <p className='text-xs tracking-wide text-stone-500 font-light capitalize'>
                                                    {material.color}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='bg-white border border-stone-200 p-16 text-center rounded-lg'>
                                    <p className='text-stone-400 font-light tracking-wide text-sm font-serif italic'>
                                        Nuk u gjet asnjë material që përputhet
                                        me kriteret e kërkimit.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* HIGH-END MODAL */}
            {selectedMaterial && (
                <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300'>
                    <div className='bg-white max-w-5xl w-full max-h-[92vh] overflow-y-auto rounded-none shadow-2xl relative border border-stone-200'>
                        <button
                            onClick={() => setSelectedMaterial(null)}
                            className='absolute top-4 right-4 z-20 p-2 bg-white/95 backdrop-blur hover:bg-stone-100 transition-colors shadow-md rounded-full text-stone-800'
                        >
                            <X size={18} />
                        </button>

                        <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
                            {/* Image Left */}
                            <div className='h-72 md:h-full min-h-[400px] bg-stone-100 relative'>
                                <img
                                    src={selectedMaterial.image_url}
                                    alt={selectedMaterial.name}
                                    className='w-full h-full object-cover'
                                />
                            </div>

                            {/* Details Right */}
                            <div className='p-8 md:p-12 flex flex-col justify-between space-y-8 bg-[#faf9f6]'>
                                <div className='space-y-6'>
                                    <div>
                                        <span className='text-[10px] font-mono tracking-[0.2em] text-amber-600 uppercase block mb-1'>
                                            {selectedMaterial.category}
                                        </span>
                                        <h2 className='text-3xl font-serif font-light tracking-tight text-stone-900'>
                                            {selectedMaterial.name}
                                        </h2>
                                    </div>

                                    <div className='h-[1px] bg-stone-200 w-12' />

                                    <div>
                                        <h3 className='text-xs uppercase tracking-widest font-bold text-stone-400 mb-2 font-mono'>
                                            Përshkrimi
                                        </h3>
                                        <p className='text-stone-600 font-light text-sm leading-relaxed tracking-wide'>
                                            {selectedMaterial.description ||
                                                "Nuk ka një përshkrim të disponueshëm për këtë material."}
                                        </p>
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-y-6 gap-x-4 border-t border-stone-200 pt-6 text-sm'>
                                    <div>
                                        <span className='block text-[10px] font-mono uppercase text-stone-400 mb-0.5'>
                                            Karakteri / Ngjyra
                                        </span>
                                        <span className='font-light capitalize text-stone-800'>
                                            {selectedMaterial.color}
                                        </span>
                                    </div>

                                    {selectedMaterial.origin && (
                                        <div>
                                            <span className='block text-[10px] font-mono uppercase text-stone-400 mb-0.5'>
                                                Vendi i Origjinës
                                            </span>
                                            <span className='font-light text-stone-800'>
                                                {selectedMaterial.origin}
                                            </span>
                                        </div>
                                    )}

                                    {selectedMaterial.price_range && (
                                        <div className='col-span-2'>
                                            <span className='block text-[10px] font-mono uppercase text-stone-400 mb-0.5'>
                                                Segmenti i Çmimit
                                            </span>
                                            <span className='font-serif italic text-amber-700 text-base'>
                                                {selectedMaterial.price_range}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
