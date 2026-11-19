'use client'
import {useState} from 'react'
import Link from 'next/link'
type Post={slug:string;title:string;date:string}
export function WritingList({posts}:{posts:Post[]}){
 const [search,setSearch]=useState(''),[year,setYear]=useState('all')
 const years=[...new Set(posts.map(p=>p.date.slice(0,4)))]
 const filtered=posts.filter(p=>(year==='all'||p.date.startsWith(year))&&`${p.title} ${p.date}`.toLowerCase().includes(search.toLowerCase()))
 return <><div className="mb-10 space-y-4"><p className="text-[14px] font-normal text-neutral-500">{posts.length} writings & drafts</p><div className="flex gap-3"><input className="min-w-0 flex-1 border border-neutral-400 rounded px-3 py-2 bg-transparent text-[16px] font-normal" aria-label="Search writings" placeholder="Search titles…" value={search} onChange={e=>setSearch(e.target.value)}/><select className="border border-neutral-400 rounded px-2 py-2 bg-transparent text-[16px] font-normal" aria-label="Filter by year" value={year} onChange={e=>setYear(e.target.value)}><option value="all">All years</option>{years.map(y=><option key={y}>{y}</option>)}</select></div></div><div className="space-y-10">{filtered.length===0&&<p>No matching posts.</p>}{years.filter(y=>filtered.some(p=>p.date.startsWith(y))).map(y=><section key={y} aria-labelledby={`year-${y}`}><h2 id={`year-${y}`} className="text-[14px] text-neutral-500 mb-4">{y}</h2><ul className="space-y-5">{filtered.filter(p=>p.date.startsWith(y)).map(p=><li key={p.slug} className="flex items-baseline gap-4"><time dateTime={p.date} className="w-14 shrink-0 text-[13px] text-neutral-500 tabular-nums">{p.date.length===4?'draft':new Date(p.date).toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'})}</time><Link href={`/blog/${p.slug}`} className="underline text-[18px] leading-snug">{p.title}</Link></li>)}</ul></section>)}</div></>
}
