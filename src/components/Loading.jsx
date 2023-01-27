export default function Loading() {
  return (
    <main className='grid place-content-center'>
      <div className='loading'>
        <div className='jelly-triangle'>
          <div className='jelly-triangle__dot'></div>
          <div className='jelly-triangle__traveler'></div>
        </div>
        <svg width='0' height='0' className='jelly-maker'>
          <defs>
            <filter id='uib-jelly-triangle-ooze'>
              <feGaussianBlur in='SourceGraphic' stdDeviation='7.3' result='blur'></feGaussianBlur>
              <feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7' result='ooze'></feColorMatrix>
              <feBlend in='SourceGraphic' in2='ooze'></feBlend>
            </filter>
          </defs>
        </svg>
      </div>
    </main>
  );
}

export function LoadNotes({ height }) {
  return (
    <div className={"p-4 mb-3.5 rounded-lg shadow animate-pulse overflow-hidden " + height}>
      <div className='rounded-md bg-orange-200/25 w-full h-24'></div>
      <div className='flex-1 py-2'>
        <div className='h-2 bg-orange-200/25 rounded my-1'></div>
        <div className='space-y-3'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-orange-200/25 rounded col-span-2'></div>
            <div className='h-2 bg-orange-200/25 rounded col-span-1'></div>
          </div>
          <div className='h-2 bg-orange-200/25 rounded'></div>
        </div>
      </div>
    </div>
  );
}
export function LoadFolders() {
  return <div className=' animate-pulse relative w-20 my-2 mx-2 h-6 bg-orange-200/25 rounded-md'></div>;
}
