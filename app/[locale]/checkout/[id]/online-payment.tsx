import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import ProductPrice from '@/components/shared/product/product-price'
import useSettingStore from '@/hooks/use-setting-store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import QRCode from 'react-qr-code'

export default function UpiQrForm({
  priceInCents,
  orderId,
  paymentMethod
}: {
  priceInCents: number
  orderId: string
  paymentMethod:string
}) {
  const {
    setting: { site },
  } = useSettingStore()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [transactionId, setTransactionId] = useState('')
  const [email, setEmail] = useState('')

  // This would be your actual UPI ID
  const upiId = site.upiId
  
  const amount = (priceInCents / 100).toFixed(2)
  
  // Generate QR code URL (this is a sample format, actual implementation may vary)
  const qrCodeUrl = `upi://pay?pa=${upiId}&pn=${site.name}&am=${amount}&cu=INR&tn=Payment for Order ${orderId}`

 // ... in your UpiQrForm component ...

async function handleSubmit(e: FormEvent) {
  e.preventDefault()

  if (!transactionId || !email) {
    setErrorMessage('Please fill all fields')
    return
  }

  setIsLoading(true)
  
  try {
    const response = await fetch('/api/verify-upi-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        transactionId,
        email,
        amount: priceInCents,
        paymentMethod
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Payment verification failed')
    }

    // Redirect to success page after verification
    window.location.href = `${site.url}/account/orders/${orderId}?payment=success`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    setErrorMessage(error.message || 'Payment verification failed. Please check the transaction ID.')
  } finally {
    setIsLoading(false)
  }
}


  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='text-xl'>UPI QR Payment</div>
      {errorMessage && <div className='text-destructive'>{errorMessage}</div>}
      
      <div className="flex flex-col items-center gap-4">
        <div className="border p-4 -lg">
        <QRCode 
            value={qrCodeUrl}
            size={200}
            level="Q" // Error correction level
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>
        
        <div className="text-center">
          <p className="font-medium">Scan the QR code to pay</p>
          <p className="text-sm text-muted-foreground">Amount: ₹{amount}</p>
          <p className="text-sm text-muted-foreground">UPI ID: {upiId}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="transactionId">Transaction ID</Label>
        <Input
          id="transactionId"
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter UPI transaction ID"
          required
        />
        <p className="text-sm text-muted-foreground">
          After payment, please enter the transaction ID from your UPI app.
        </p>
      </div>

      <Button
        className='w-full'
        size='lg'
        disabled={isLoading}
      >
        {isLoading ? (
          'Verifying Payment...'
        ) : (
          <div>
            Verify Payment - <ProductPrice price={priceInCents / 100} plain />
          </div>
        )}
      </Button>
    </form>
  )
}