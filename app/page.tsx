'use client'
import './globals.css'
import Image from 'next/image'

export default function HomePage() {
  const topics = [
    {
      title: 'อยากเป็นคนคุม AI เพื่อ ทำประโยชน์ให้สะดวกสบายมากขึ้น',
    },
    {
      title: 'ความรู้มาประยุกต์สร้างเว็บไซต์ที่ใช้งานได้จริง',
    },
    {
      title: 'อยากทำงานบริษัทเกี่ยวกับเครือธนาคาร',
    },
    {
      title: 'รายได้ที่คาดหวังในอนาคต: 30,000-50,000บ.',
    },
  ]

  return (
    <main className="">
      <section className=" mt-4 mx-auto grid max-w-5xl grid-cols-1 gap-6 rounded-xl border border-gray-200 bg-white p-5 md:grid-cols-[240px_1fr] md:p-6">

        {/* Profile */}
        <aside className="self-start overflow-hidden rounded-lg border border-gray-200">
          <div className="relative h-52 w-full overflow-hidden bg-gray-100">
            <Image
              src="/assets/Paoan.jpg"
              alt="รูปโปรไฟล์ภาคิน"
              fill
              className="object-cover object-center"
              sizes="250px"
              priority
            />
          </div>

          <div className="space-y-2 bg-white p-4 /assets/bk.png">
            <h2 className="text-lg font-semibold">
              Phakin Ngamdechakij
            </h2>
            <p className="text-sm leading-6 text-gray-600">
              นักศึกษา คณะเทคโนโลยีสารสนเทศ
              สาขา วิทยาการคอมพิวเตอร์ ปี2 <br />
              มหาวิทยาลัยศรีปทุม SPU<br />
            </p>
            <p className="text-sm text-gray-600">
              รหัสนักศึกษา 68070606
            </p>
            <p className="text-sm text-gray-600">

            </p>
          </div>
        </aside>

        {/* Course Information */}
        <article className="py-1">
          <span className="inline-block rounded-md bg-blue-50 px-3 py-1.5 text-xs font-bold tracking-wider text-blue-600">
            ABOUT ME
          </span>

          <h1 className="mt-4 text-2xl font-medium leading-snug">
            CSI205 Front-End Software Development
          </h1>

          <p className="mt-3 text-md leading-7 text-gray-600">
            ยินดีต้อนรับสู่เว็บไซต์ของฉัน พื้นที่รวบรวมผลงาน
            และการเรียนรู้เกี่ยวกับการพัฒนาเว็บไซต์ส่วน Front End
          </p>

          <h2 className="mb-4 mt-6 font-semibold">
            เป้าหมาย
          </h2>

          <ul className="space-y-4">
            {topics.map((topic) => (
              <li key={topic.title} className="flex gap-3">
                {/* <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-bold text-green-600">
                  ✓
                </span> */}

                <div>
                  <h2 className="text-md font-semibold">
                    {topic.title}
                  </h2>
                </div>
                
              </li>
            ))}
          </ul>
        <div className="mt-6 flex justify-end">
            <Image
              src="/assets/scb.png"
              alt="SCB ธนาคารไทยพาณิชย์"
              width={160}
              height={160}
              className="h-auto w-50 object-contain"
            />
          </div>
        </article>
      </section>
    </main>
  )
}
