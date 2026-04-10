import { useParams } from 'react-router-dom'

function WorkDetailPage() {
  const { id } = useParams()

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 py-24 text-chalk sm:px-10 lg:px-14">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent">
          WORK DETAIL
        </p>
        <h1 className="mt-6 font-heading text-5xl font-light sm:text-6xl">
          Project {id}
        </h1>
        <p className="mt-5 text-[15px] leading-[1.8] text-mist">
          This detail page is intentionally empty for now.
        </p>
      </div>
    </main>
  )
}

export default WorkDetailPage
