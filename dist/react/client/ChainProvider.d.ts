import { ReactNode } from 'react';
import { ChainClient } from '../../core/index.js';
export default function ChainProvider({ client, children, }: {
    client: ChainClient;
    children: ReactNode;
}): JSX.Element;
