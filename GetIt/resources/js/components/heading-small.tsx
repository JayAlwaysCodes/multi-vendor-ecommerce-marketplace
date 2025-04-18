export default function HeadingSmall({ title, description }: { title: string; description?: string }) {
    return (
        <header>
            <h3 className="mb-0.5 text-base font-semibold text-[#FFD700] font-['Orbitron']">{title}</h3>
            {description && <p className="text-[#A1A09A] text-sm font-['Inter']">{description}</p>}
        </header>
    );
}