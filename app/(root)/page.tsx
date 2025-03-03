import { UserButton } from '@clerk/nextjs'
import styles from './page.module.css'
import { Box, Heading } from '@chakra-ui/react'
import { fetchPosts } from '@/lib/actions/thread.actions'
import ThreadCard from '@/components/cards/ThreadCard';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  console.log(result);

  return (
    <Box>
      {/* <UserButton afterSignOutUrl='/sign-in' /> */}
      <Heading>Home</Heading>
      <Box>
        {result.posts.length === 0 ? <p>NO Posts Available</p> : result.posts.map(item => <ThreadCard
          key={item._id}
          id={item._id}
          currentUserId={user?.id}
          parentId={item.parentId}
          content={item.text}
          author={item.author}
          community={item.community}
          createdAt={item.createdAt}
          comments={item.children}
        />)}
      </Box>
    </Box>
  )
}
