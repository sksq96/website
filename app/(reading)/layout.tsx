import { WithSidebar } from '../components/sidebar'

// the reading section keeps the site sidebar, like /work and /links
export default function Layout({ children }: { children: React.ReactNode }) {
  return <WithSidebar>{children}</WithSidebar>
}
