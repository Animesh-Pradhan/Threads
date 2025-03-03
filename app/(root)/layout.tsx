import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from "@/components/ui/provider"
import { ClerkProvider } from '@clerk/nextjs'
import { Box, Flex } from '@chakra-ui/react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Next 13 Project of Thread Meta Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Provider>
            <Flex flexDir={'column'} h={'100vh'} bg={'#000'} color={'#fff'}>
              <Navbar />
              <Flex h={'calc(100vh - 60px)'} w={'100%'} overflowY={'auto'}>
                <LeftSidebar />
                <Box w="100%" p={4}>
                  {children}
                </Box>
                <RightSidebar />
              </Flex>
              <Footer />
            </Flex>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}
