import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Sparkles, Download, Sun, Moon } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toPng } from "html-to-image";

interface Material {
    id: string;
    name: string;
    category: string;
    image_url: string;
    origin?: string;
    finish?: string;
}

interface SelectedMaterials {
    island: Material | null;
    backsplash: Material | null;
    countertop: Material | null;
}

export default function RoomDesignPage() {
    const viewContainerRef = useRef<HTMLDivElement>(null);

    const [materials, setMaterials] = useState<Material[]>([]);
    const [selectedSurface, setSelectedSurface] = useState<
        keyof SelectedMaterials | null
    >(null);

    const [selectedMaterials, setSelectedMaterials] =
        useState<SelectedMaterials>({
            island: null,
            backsplash: null,
            countertop: null,
        });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [openCategories, setOpenCategories] = useState<Set<string>>(
        new Set(),
    );

    const [ambientMood, setAmbientMood] = useState<"daylight" | "atmospheric">(
        "daylight",
    );

    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        const { data, error } = await supabase
            .from("materials")
            .select("*")
            .order("category", { ascending: true })
            .order("name");

        if (!error && data) {
            setMaterials(data);

            const categories = Array.from(new Set(data.map((m) => m.category)));

            if (categories.length > 0) {
                setOpenCategories(new Set([categories[0]]));
            }
        }
    };

    const toggleCategory = (category: string) => {
        setOpenCategories((prev) => {
            const next = new Set(prev);

            if (next.has(category)) next.delete(category);
            else next.add(category);

            return next;
        });
    };

    const handleSurfaceClick = (surface: keyof SelectedMaterials) => {
        setSelectedSurface(surface);
        setIsModalOpen(true);
    };

    const handleMaterialSelect = (material: Material) => {
        if (selectedSurface) {
            setSelectedMaterials((prev) => ({
                ...prev,
                [selectedSurface]: material,
            }));

            setIsModalOpen(false);
            setSelectedSurface(null);
        }
    };

    // DOWNLOAD IMAGE
    const handleDownloadJPG = async () => {
        if (!viewContainerRef.current) return;

        setIsDownloading(true);

        try {
            const dataUrl = await toPng(viewContainerRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: "#ffffff",
            });

            const link = document.createElement("a");
            link.download = "kuzhina-ime.png";
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Gabim:", error);

            alert(
                "Ndodhi një gabim gjatë shkarkimit të dizajnit. Ju lutem provoni përsëri.",
            );
        } finally {
            setIsDownloading(false);
        }
    };

    const surfaceLabels: Record<keyof SelectedMaterials, string> = {
        island: "Ishulli & Banak",
        backsplash: "Muri i Pasëm / Backsplash",
        countertop: "Countertop",
    };

    // const islandPaths = [

    // const islandPaths =
    //     "M654 637.5L311.5 569L853.5 486L1101.5 504.5L654 637.5Z " +
    //     "M654.75 638L310.5 569L305.75 903H654.75V638Z " +
    //     "M1101.5 504L655 637.5V661.5L1101.5 519.5V504Z " +
    //     "M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z";

    const islandPaths =
        // top
        "M654 637.5L311.5 569L853.5 486L1101.5 504.5L654 637.5Z " +
        // front cabinet (extend right by 1px)
        "M654.75 638L310.5 569L305.75 903H656V638Z " +
        // side face (move left by 1px)
        "M1101.5 504L654 637.5V661.5L1101.5 519.5V504Z " +
        // leg
        "M688.75 651.5L655.75 660.401V902.5H688.75V651.5Z";

    const backsplashPath = "M610 13L3 0L0 171.5L610 113V13Z";
    const countertopPath = "M605 0L0 57.5V95L12.5 101.5L705.5 20V7.5L605 0Z";

    return (
        <div className='min-h-screen bg-zinc-50 text-zinc-900 font-sans'>
            {/* HERO */}
            <div className='bg-zinc-950 text-white py-24 border-b border-zinc-900 relative overflow-hidden'>
                <div className='max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10'>
                    <span className='text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-medium mb-3 block'>
                        Studio Visualizer
                    </span>

                    <h1 className='text-4xl md:text-5xl font-serif font-light tracking-wide mb-4'>
                        Studio e Vizualizimit
                    </h1>

                    <p className='text-xs md:text-sm text-zinc-400 uppercase tracking-widest font-light max-w-xl mx-auto leading-relaxed border-t border-zinc-800/60 pt-4 mt-4'>
                        Konfiguro mermerët më ekskluzivë në hapësirën tënde
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                {/* TOP BAR */}
                <div className='flex justify-between items-center mb-6 pb-4 border-b border-zinc-200/60'>
                    <div className='flex items-center gap-2 text-zinc-400'>
                        <Sparkles className='w-4 h-4 text-zinc-400' />

                        <span className='text-xs uppercase tracking-wider font-light'>
                            Interactive Canvas
                        </span>
                    </div>

                    <div className='flex bg-zinc-200/60 p-1 rounded-full border border-zinc-300/30'>
                        <button
                            onClick={() => setAmbientMood("daylight")}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-wider transition-all ${
                                ambientMood === "daylight"
                                    ? "bg-white text-zinc-900 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-800"
                            }`}
                        >
                            <Sun className='w-3.5 h-3.5' />
                            Dritë Natyrale
                        </button>

                        <button
                            onClick={() => setAmbientMood("atmospheric")}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-wider transition-all ${
                                ambientMood === "atmospheric"
                                    ? "bg-zinc-900 text-white shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-800"
                            }`}
                        >
                            <Moon className='w-3.5 h-3.5' />
                            Atmosferik
                        </button>
                    </div>
                </div>

                <div className='grid lg:grid-cols-4 gap-12 items-start'>
                    {/* VISUALIZER */}
                    <div
                        ref={viewContainerRef}
                        className='lg:col-span-3 bg-white rounded-xl shadow-sm border border-zinc-200/80 p-3 relative overflow-hidden'
                    >
                        <div className='relative'>
                            <rect
                                x='0'
                                y='0'
                                width='1200'
                                height='903'
                                filter='url(#grain)'
                                opacity='0.25'
                                pointerEvents='none'
                            />
                            <svg
                                viewBox='0 0 1200 903'
                                className='w-full h-auto rounded-lg'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <defs>
                                    <filter id='grain'>
                                        <feTurbulence
                                            type='fractalNoise'
                                            baseFrequency='0.8'
                                            numOctaves='3'
                                            stitchTiles='stitch'
                                        />
                                        <feColorMatrix
                                            type='matrix'
                                            values='
    1 0 0 0 0
    0 1 0 0 0
    0 0 1 0 0
    0 0 0 0.08 0'
                                        />
                                    </filter>
                                    <filter id='softEdges'>
                                        <feGaussianBlur stdDeviation='0.6' />
                                    </filter>
                                    <linearGradient
                                        id='lightShade'
                                        x1='0'
                                        y1='0'
                                        x2='1'
                                        y2='1'
                                    >
                                        <stop
                                            offset='0%'
                                            stop-color='white'
                                            stop-opacity='0.15'
                                        />
                                        <stop
                                            offset='50%'
                                            stop-color='transparent'
                                        />
                                        <stop
                                            offset='100%'
                                            stop-color='black'
                                            stop-opacity='0.12'
                                        />
                                    </linearGradient>
                                    {/* ISLAND */}
                                    <pattern
                                        id='islandMarblePattern'
                                        patternUnits='objectBoundingBox'
                                        patternContentUnits='objectBoundingBox'
                                        width='1'
                                        height='1'
                                    >
                                        <image
                                            href={
                                                selectedMaterials.island
                                                    ?.image_url || ""
                                            }
                                            crossOrigin='anonymous'
                                            x='0'
                                            y='0'
                                            width='1'
                                            height='1'
                                            preserveAspectRatio='xMidYMid slice'
                                        />
                                    </pattern>

                                    {/* BACKSPLASH */}
                                    <pattern
                                        id='backsplashPattern'
                                        patternUnits='userSpaceOnUse'
                                        width='610'
                                        height='172'
                                    >
                                        <image
                                            href={
                                                selectedMaterials.backsplash
                                                    ?.image_url || ""
                                            }
                                            crossOrigin='anonymous'
                                            x='0'
                                            y='0'
                                            width='610'
                                            height='172'
                                            preserveAspectRatio='xMidYMid slice'
                                        />
                                    </pattern>

                                    {/* COUNTERTOP */}
                                    <pattern
                                        id='countertopPattern'
                                        patternUnits='objectBoundingBox'
                                        patternContentUnits='objectBoundingBox'
                                        width='1'
                                        height='1'
                                    >
                                        <image
                                            href={
                                                selectedMaterials.countertop
                                                    ?.image_url || ""
                                            }
                                            crossOrigin='anonymous'
                                            x='0'
                                            y='0'
                                            width='1'
                                            height='1'
                                            preserveAspectRatio='xMidYMid slice'
                                        />
                                    </pattern>
                                </defs>

                                {/* MARBLE LAYERS */}
                                <g>
                                    {/* {islandPaths.map(({ key, d }) => (
                                        <path
                                            key={key}
                                            d={d}
                                            fill={
                                                selectedMaterials.island
                                                    ? "url(#islandMarblePattern)"
                                                    : "#F4F4F5"
                                            }
                                            style={{
                                                mixBlendMode: "multiply",
                                                opacity: 0.9,
                                            }}
                                        />
                                    ))} */}

                                    <path
                                        d={islandPaths}
                                        fill={
                                            selectedMaterials.island
                                                ? "url(#islandMarblePattern)"
                                                : "#F4F4F5"
                                        }
                                        style={{
                                            mixBlendMode: "multiply",
                                            opacity: 0.9,
                                        }}
                                    />

                                    <path
                                        d={backsplashPath}
                                        transform='translate(8 350)'
                                        fill={
                                            selectedMaterials.backsplash
                                                ? "url(#backsplashPattern)"
                                                : "#F4F4F5"
                                        }
                                        style={{
                                            mixBlendMode: "multiply",
                                            opacity: 0.9,
                                        }}
                                    />

                                    <path
                                        d={countertopPath}
                                        transform='translate(8 463)'
                                        fill={
                                            selectedMaterials.countertop
                                                ? "url(#countertopPattern)"
                                                : "#F4F4F5"
                                        }
                                        style={{
                                            mixBlendMode: "multiply",
                                            opacity: 0.9,
                                        }}
                                    />
                                </g>

                                {/* KITCHEN PNG */}
                                <image
                                    href={`${window.location.origin}/Kitchen.png`}
                                    width='1200'
                                    height='903'
                                    preserveAspectRatio='xMidYMid meet'
                                    // style={{
                                    //     mixBlendMode: "multiply",
                                    //     opacity: 0.9,
                                    // }}
                                />

                                {/* CLICKABLE AREAS */}
                                <g
                                    fill='transparent'
                                    style={{ cursor: "pointer" }}
                                >
                                    {/* {islandPaths.map(({ key, d }) => (
                                        <path
                                            key={`hit-${key}`}
                                            d={d}
                                            onClick={() =>
                                                handleSurfaceClick("island")
                                            }
                                            className='hover:fill-black/5 transition-colors duration-200'
                                        />
                                    ))} */}

                                    <path
                                        d={islandPaths}
                                        onClick={() =>
                                            handleSurfaceClick("island")
                                        }
                                        className='hover:fill-black/5 transition-colors duration-200'
                                    />

                                    <path
                                        d={backsplashPath}
                                        transform='translate(0 347)'
                                        onClick={() =>
                                            handleSurfaceClick("backsplash")
                                        }
                                        className='hover:fill-black/5 transition-colors duration-200'
                                    />

                                    <path
                                        d={countertopPath}
                                        transform='translate(8 463)'
                                        onClick={() =>
                                            handleSurfaceClick("countertop")
                                        }
                                        className='hover:fill-black/5 transition-colors duration-200'
                                    />
                                </g>
                            </svg>

                            {/* LIGHT EFFECTS */}
                            <div
                                className={`absolute inset-0 bg-orange-950/15 mix-blend-multiply pointer-events-none rounded-lg transition-opacity duration-700 ${
                                    ambientMood === "atmospheric"
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            />

                            <div
                                className={`absolute inset-0 bg-indigo-950/10 mix-blend-color-burn pointer-events-none rounded-lg transition-opacity duration-700 ${
                                    ambientMood === "atmospheric"
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            />
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className='lg:col-span-1 space-y-6'>
                        <div className='bg-white rounded-xl border border-zinc-200 p-6 shadow-sm'>
                            <h2 className='text-xs font-medium tracking-widest uppercase text-zinc-400 mb-6'>
                                Konfigurimi aktual
                            </h2>

                            <div className='space-y-6 mb-8'>
                                {(
                                    Object.keys(surfaceLabels) as Array<
                                        keyof SelectedMaterials
                                    >
                                ).map((key) => {
                                    const currentMaterial =
                                        selectedMaterials[key];

                                    return (
                                        <div key={key}>
                                            <label className='text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block'>
                                                {surfaceLabels[key]}
                                            </label>

                                            <button
                                                onClick={() =>
                                                    handleSurfaceClick(key)
                                                }
                                                className='w-full flex items-center gap-4 p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 bg-white'
                                            >
                                                <div className='w-16 h-16 rounded bg-zinc-100 overflow-hidden flex-shrink-0'>
                                                    {currentMaterial ? (
                                                        <img
                                                            src={
                                                                currentMaterial.image_url
                                                            }
                                                            alt=''
                                                            crossOrigin='anonymous'
                                                            className='w-full h-full object-cover'
                                                        />
                                                    ) : (
                                                        <div className='w-full h-full flex items-center justify-center text-zinc-300 text-xl'>
                                                            +
                                                        </div>
                                                    )}
                                                </div>

                                                <div className='flex-1 text-left'>
                                                    <span className='text-xs font-medium text-zinc-800 block uppercase tracking-wide'>
                                                        {currentMaterial
                                                            ? currentMaterial.name
                                                            : "Zgjidh Materialin"}
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* BUTTONS */}
                            <div className='space-y-3 pt-6 border-t border-zinc-100'>
                                <button
                                    onClick={handleDownloadJPG}
                                    disabled={isDownloading}
                                    className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 text-white rounded-md text-xs uppercase tracking-widest hover:bg-zinc-800 disabled:bg-zinc-400 transition-colors'
                                >
                                    <Download className='w-3.5 h-3.5' />

                                    {isDownloading
                                        ? "Duke ruajtur..."
                                        : "Shkarko Dizajnin"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-xl max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col'>
                        <div className='p-6 border-b flex justify-between items-center'>
                            <div>
                                <h2 className='text-xl font-serif'>
                                    Materialet
                                </h2>

                                <p className='text-xs text-zinc-400 uppercase mt-1'>
                                    {selectedSurface &&
                                        surfaceLabels[selectedSurface]}
                                </p>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100'
                            >
                                <X className='w-5 h-5' />
                            </button>
                        </div>

                        <div className='p-6 overflow-y-auto space-y-4'>
                            {Array.from(
                                new Set(materials.map((m) => m.category)),
                            ).map((category) => {
                                const isOpen = openCategories.has(category);

                                const categoryMaterials = materials.filter(
                                    (m) => m.category === category,
                                );

                                return (
                                    <div
                                        key={category}
                                        className='border rounded-lg overflow-hidden'
                                    >
                                        <button
                                            onClick={() =>
                                                toggleCategory(category)
                                            }
                                            className='w-full flex items-center justify-between p-4 bg-white hover:bg-zinc-50'
                                        >
                                            <h3 className='text-sm font-medium uppercase'>
                                                {category}
                                            </h3>

                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform ${
                                                    isOpen ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>

                                        {isOpen && (
                                            <div className='p-6 border-t'>
                                                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                                                    {categoryMaterials.map(
                                                        (material) => (
                                                            <button
                                                                key={
                                                                    material.id
                                                                }
                                                                onClick={() =>
                                                                    handleMaterialSelect(
                                                                        material,
                                                                    )
                                                                }
                                                                className='group text-left'
                                                            >
                                                                <div className='relative aspect-square rounded-md overflow-hidden border border-zinc-200 group-hover:border-zinc-900 transition-all bg-zinc-50'>
                                                                    <img
                                                                        src={
                                                                            material.image_url
                                                                        }
                                                                        alt={
                                                                            material.name
                                                                        }
                                                                        crossOrigin='anonymous'
                                                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                                                    />
                                                                </div>

                                                                <p className='mt-2 text-xs font-medium uppercase tracking-wide'>
                                                                    {
                                                                        material.name
                                                                    }
                                                                </p>
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
