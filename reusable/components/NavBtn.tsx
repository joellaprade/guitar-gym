import Link from 'next/link';

type Props = {
  text: string;
  href: string;
  className: string;
};

const NavBtn = ({ text, href, className }: Props) => {
  return (
    <Link href={href}>
      <button className={`${className} cursor-pointer`}>{text}</button>
    </Link>
  );
};

export default NavBtn;
