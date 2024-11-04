import { Spinner } from '@/components/ui/spinner';

enum SizeEnum {
  small = 'small',
  medium = 'medium',
  large = 'large',
}
interface LoadingI {
  size: SizeEnum;
}
const Loading = ({ size }: LoadingI) => {
  return (
    <div className='flex items-center'>
      <Spinner size={size} />
    </div>
  );
};
export default Loading;
