export default function Heading({ title, description }: { title: string; description?: string }) {
    return (
        <div className="mb-8 space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight text-[#FFD700] font-['Orbitron']">{title}</h2>
            {description && <p className="text-[#A1A09A] text-sm font-['Inter']">{description}</p>}
        </div>
    );
}