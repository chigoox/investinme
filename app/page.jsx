
import Post from "./Support/Componets/General/Post";
import { formatNumber } from "./Support/myCodes/Util";

export default function Home() {



  return (
    <main className="flex min-h-screen overflow-x-hidden flex-col items-center justify-evenly bg-black text-white">
      <div className="grid grid-cols-1 gap-8 m-auto">
        <Post
          PostId={0}
          type={'vid'}
          link={'https://firebasestorage.googleapis.com/v0/b/investa-5.appspot.com/o/pexels-google-deepmind-18069236%20(Original).mp4?alt=media&token=9e74557c-2da0-48ff-859c-8d262b354621&_gl=1*nfwwem*_ga*NDk5NzE2OTI2LjE2OTcwMjEwMzg.*_ga_CW55HF8NVT*MTY5ODY1NzU2OC40MC4xLjE2OTg2NTgxNjcuNTUuMC4w'}
          likes={100}
          donations={7000000}
          desc={'This is a new post'}
          tags={['new', 'lifestyle', 'ok']}
          comments={[{
            user: 'ED5',
            commentLikes: 5,
            comment: 'hello world'
          },
          {
            user: 'TEST',
            commentLikes: 50,
            comment: 'hello 5'
          },
          {
            user: 'gooler',
            commentLikes: 2,
            comment: 'hello people'
          }
          ]}
        />

        <Post
          PostId={1}
          type={'img'}
          link={'https://plus.unsplash.com/premium_photo-1698493972995-a9c0300f1b1e?auto=format&fit=crop&q=80&w=1675&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          likes={100}
          desc={'This is a new post'}
          donations={500}
          comments={[{
            user: 'aster',
            commentLikes: 5,
            comment: 'world is cool'
          },
          {
            user: 'aster',
            commentLikes: 5,
            comment: 'world is cool'
          },
          {
            user: 'aster',
            commentLikes: 5,
            comment: 'world is cool'
          },
          {
            user: 'aster',
            commentLikes: 5,
            comment: 'world is cool'
          },
          {
            user: 'TEST',
            commentLikes: 50,
            comment: 'hello 5'
          },
          {
            user: 'gooler',
            commentLikes: 2,
            comment: 'hello hey people'
          }
          ]}
        />

        <Post
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


      </div>







    </main>
  )
}

