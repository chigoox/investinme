'use client'
import { HomeFeed } from "./Support/Componets/HomePage/HomeFeed.jsx";


export default function Home() {





  return (
    <main className="flex min-h-screen overflow-x-hidden flex-col items-center justify-evenly bg-black text-white">
      <HomeFeed />








    </main>
  )
}

/*    <Post
     PostId={1}
     type={'str'}
     text={'Post with text only'}
     likes={100867000}
     donations={200}
     desc={'This is a new post'}
     comments={[
       {
         user: 'TEST',
         commentLikes: formatNumber(100),
         comment: 'hello 5'
       },
       {
         user: 'gooler',
         commentLikes: 2,
         comment: 'hello hey people'
       }, {}, {}
     ]}
   />
*/