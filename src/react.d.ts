import * as React from '@types/react';

declare module 'react'
{
    // Functional component with children
    type FCWC<P = { children?: React.ReactNode }> = FunctionComponent<P>;
}