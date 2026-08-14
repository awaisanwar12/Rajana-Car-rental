import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function PhoneIcon({ size = 20, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z" /></svg>;
}

export function WhatsAppIcon({ size = 20, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.4 9.4 0 0 1-3.8-1l-5.2 1.1 1.2-5a8.4 8.4 0 1 1 16.8-3.5Z" /><path d="M8.2 7.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.7.8c-.2.2-.1.4 0 .6.7 1.2 1.7 2.2 3 2.8.3.1.5.1.7-.1l.9-1.1c.2-.2.4-.3.7-.2l1.9.9c.3.1.5.3.5.5 0 .3-.1 1.4-.7 2-.6.6-1.4.9-2.3.9-1.3 0-3.5-.7-5.7-2.7-1.8-1.7-3-3.8-3.1-5.2 0-.7.2-1.2.6-1.6Z" /></svg>;
}

export function ArrowIcon({ size = 20, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

export function MenuIcon({ size = 24, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

export function CloseIcon({ size = 24, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function MapPinIcon({ size = 20, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}

export function ClockIcon({ size = 20, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
}

export function CheckIcon({ size = 20, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m5 12 4 4L19 6" /></svg>;
}

export function UsersIcon({ size = 20, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}

export function ShieldIcon({ size = 20, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>;
}

export function PlaneIcon({ size = 20, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M22 2 9 15M22 2l-7 20-4-9-9-4 20-7Z" /></svg>;
}

export function FileIcon({ size = 20, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>;
}
