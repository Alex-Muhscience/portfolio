import Image from "next/image"
import { DESKTOP_SIZE, MOBILE_SIZE, type Screenshot } from "@/data/screenshots"

/** A plain browser window: three dots, the address, then the screenshot. */
export function BrowserFrame({ shot, sizes, priority = false }: { shot: Screenshot; sizes: string; priority?: boolean }) {
  return (
    <figure className="browser-frame">
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dots"><i /><i /><i /></span>
        <span className="browser-address">{shot.address}</span>
      </div>
      <Image
        src={shot.desktop}
        alt={shot.alt}
        width={DESKTOP_SIZE.width}
        height={DESKTOP_SIZE.height}
        sizes={sizes}
        priority={priority}
      />
    </figure>
  )
}

/** A phone outline around the mobile capture. Decorative: the browser frame carries the description. */
export function PhoneFrame({ shot }: { shot: Screenshot }) {
  if (!shot.mobile) return null
  return (
    <figure className="phone-frame" aria-hidden="true">
      <Image src={shot.mobile} alt="" width={MOBILE_SIZE.width} height={MOBILE_SIZE.height} sizes="10rem" />
    </figure>
  )
}
