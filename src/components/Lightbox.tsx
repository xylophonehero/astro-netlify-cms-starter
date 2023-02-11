import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface Props {
  slides: {
    src: string
    alt: string
    title: string
  }[]
}

const LightboxComponent = ({ slides }: Props) => {
  const [open, setOpen] = useState(null);

  return (
    <>
      <div>
        {
          slides?.map(({ alt, src, title }, index) => (
            <button onClick={() => setOpen(index)} key={title} className="single-grid">
              <img src={src} alt={alt} title={title} />
            </button>
          ))
        }
      </div>

      <Lightbox
        index={open}
        open={open !== null}
        close={() => setOpen(null)}
        slides={slides}
        plugins={[Thumbnails]}
      />
    </>
  );
};

export default LightboxComponent;