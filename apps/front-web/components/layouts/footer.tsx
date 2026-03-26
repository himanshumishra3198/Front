import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-display text-lg font-bold">FrontXO</span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Support
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Twitter"
            >
              <TwitterIcon className="size-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Instagram"
            >
              <InstagramIcon className="size-5" />
            </Link>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FrontXO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function Logo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path
        d="M10 10L22 22M22 10L10 22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="16"
        cy="16"
        r="6"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
