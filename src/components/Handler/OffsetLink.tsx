import React from 'react';
import { scrollWithOffset } from '@/scrollHelpers/ScrollOffset';
import { HashLink } from 'react-router-hash-link';

interface OffsetLinkProps{
    to: string;
    children: React.ReactNode;
    className?: string;
}
const OffsetLink: React.FC<OffsetLinkProps> = ({to, children, className}: OffsetLinkProps) => {
  return (
    <HashLink to={to} scroll={scrollWithOffset} className={className}>
        {children}
    </HashLink>
  );
};

export default OffsetLink;