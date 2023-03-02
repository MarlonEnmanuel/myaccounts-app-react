import * as React from '@types/react';

declare module 'react'
{
    type FCWC<P = { children?: React.ReactNode }> = FunctionComponent<P>;
}