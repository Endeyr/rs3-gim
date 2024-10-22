import Image from 'next/image';
// import { twMerge } from 'tailwind-merge';

type ServiceProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  paragraph: string;
  imgSrc?: string;
  imgAlt?: string;
  imgSide: 'left' | 'right';
};

const Service: React.FC<ServiceProps> = ({
  title,
  paragraph,
  imgSrc,
  imgAlt,
  imgSide,
  // className,
  ...props
}) => {
  // const baseClasses = 'col-span-2 col-start-2 flex flex-col justify-start items-center';

  let layout;
  if (imgSide === 'left') {
    layout = (
      <>
        {imgSrc && imgAlt && (
          <Image
            src={imgSrc}
            alt={imgAlt}
            width={650}
            height={300}
            className='hidden xl:block'
          />
        )}
        <div
          className='col-span-2 col-start-2 flex flex-col items-center justify-start'
          {...props}
        >
          <h3 className='my-2 w-full text-center text-lg font-bold capitalize'>
            {title}
          </h3>
          <p className='px-4'>{paragraph}</p>
        </div>
      </>
    );
  } else {
    layout = (
      <>
        <div
          className='col-span-2 col-start-1 flex flex-col items-center justify-start'
          {...props}
        >
          <h3 className='my-2 w-full text-wrap text-center text-lg font-bold capitalize'>
            {title}
          </h3>
          <p className='px-4'>{paragraph}</p>
        </div>
        {imgSrc && imgAlt && (
          <Image
            src={imgSrc}
            alt={imgAlt}
            width={650}
            height={300}
            className='col-start-3 hidden xl:block'
          />
        )}
      </>
    );
  }

  return <>{layout}</>;
};
export default Service;
