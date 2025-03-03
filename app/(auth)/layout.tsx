import { Provider } from "@/components/ui/provider"
import { Box } from "@chakra-ui/react"
import { ClerkProvider } from "@clerk/nextjs"
import { Metadata } from "next"
import { Inter } from "next/font/google"

import '../globals.css'

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
                        <Box bg={'#000'} color={'#fff'}>
                            {children}
                        </Box>
                    </Provider>
                </body>
            </html>
        </ClerkProvider>
    )
}