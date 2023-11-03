
import Post from "./Support/Componets/General/Post";
import { fetchInOrder } from "./Support/myCodes/Database";
import { formatNumber } from "./Support/myCodes/Util";

export default async function Home() {




  let FEED = await fetchInOrder('Posts', 'IVA-0')
  FEED = Object.values(FEED[0])
  console.log(FEED)


  return (
    <main className="flex min-h-screen overflow-x-hidden flex-col items-center justify-evenly bg-black text-white">
      <div className="grid grid-cols-1 gap-8 mt-10">
        {FEED?.sort((a, b) => {
          return b?.id - a?.id
        })
          .map((postInfo) => {
            if (postInfo.id) return (
              <Post
                key={postInfo.id}
                PostId={postInfo.id}
                type={postInfo.type}
                link={postInfo?.post?.img[0]}
                likes={postInfo.likes}
                donations={postInfo.donations}
                desc={postInfo.caption}
                tags={postInfo.tags}
                postOrigin={postInfo.creator}
                comments={postInfo.comments}
              />
            )
          })}



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

