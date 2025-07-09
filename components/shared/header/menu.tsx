import CartButton from './cart-button'
//import LanguageSwitcher from './language-switcher'
import UserButton from './user-button'
// import ThemeSwitcher from './theme-switcher'


const Menu = ({ forAdmin = false }: { forAdmin?: boolean }) => {

  return (
    <div className='flex '>
      <div className='md:flex gap-3 hidden w-full'>
      {/* <LanguageSwitcher /> */}
            {/* <ThemeSwitcher /> */}
            
            {forAdmin ? null : <CartButton />}
            <UserButton />
      
      </div>
      <div className='md:hidden flex items-center   gap-3'>
        {/* <Sheet>
          <SheetTrigger className='align-middle header-button'>
            <EllipsisVertical className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent className='bg-black text-white  flex flex-col items-start  '>
            <SheetHeader className='w-full'>
              <div className='flex items-center justify-between '>
                <SheetTitle className='  '>{t('Header.Site Menu')}</SheetTitle>
                <SheetDescription></SheetDescription>
              </div>
            </SheetHeader>
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserButton />
            <CartButton />
          </SheetContent>
        </Sheet> */}
        <CartButton />
        <UserButton />
      </div>
    </div>
  )
}

export default Menu
