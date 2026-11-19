import { CenteredContent } from '../components/sidebar'

// Keep reading pages centered at their individual reading widths.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <CenteredContent>{children}</CenteredContent>
}
