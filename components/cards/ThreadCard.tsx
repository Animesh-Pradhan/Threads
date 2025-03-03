import { Flex, Text } from '@chakra-ui/react';
import React from 'react'

type Props = {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string,
        id: string,
        image: string
    };
    community: {
        name: string,
        id: string,
        image: string
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string
        }
    }[];
    isComment?: boolean;
}

const ThreadCard: React.FC<Props> = ({ id, currentUserId, parentId, content, author, community, createdAt, comments }) => {
    return (
        <Flex>
            <Text>{content}</Text>
        </Flex>
    )
}

export default ThreadCard