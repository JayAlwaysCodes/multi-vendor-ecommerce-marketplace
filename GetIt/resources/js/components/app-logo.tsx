import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-[#2A2A40] text-[#E5E7EB] flex aspect-square size-8 items-center justify-center rounded-md border border-[#00D4FF] shadow-[0_0_5px_#00D4FF]">
                <AppLogoIcon className="size-5 fill-[#FFD700]" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-['Orbitron'] font-semibold text-[#E5E7EB]">GetIt</span>
            </div>
        </>
    );
}