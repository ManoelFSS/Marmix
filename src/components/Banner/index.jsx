

export default function Banner() {
  return (
    <div
      className="relative  xl:flex justify-center items-center h-122 xs:h-110 sm:h-125 
      lg:h-90 w-full rounded-xl   shadow-lg bg-gradient-to-r from-orange-700 to-orange-500 
        sm:px-20
      "
    >
      <section className="flex  xl:flex xl:flex-row flex-col items-center">
        <div className="relative z-10 flex gap-1 flex-col items-center pt-4 xs:w-[76%] md:w-[60%] lg:w-[70%] xl:w-[400px] ">
          <h3 className="uppercase text-[2.6rem] sm:text-[3rem] xl:text-[4rem] font-extrabold font-rubik">
            Marmitex
          </h3>
          <p className="font-rubik font-medium text-[1.4rem] xl:text-[2rem] uppercase">
            Comida Boa
          </p>
          <p className="text-white text-[0.8rem] xs:text-[0.9rem]   text-center pr-7 pl-7">
            A melhor marmitex da região está no Restaurante da Dona Neuma!
            Comida caseira, saborosa e feita todos os dias com ingredientes
            frescos. Qualidade, sabor e preço justo para o seu dia a dia.
          </p>
        </div>

        <div className=" sm:p-2 p-2 xs:p-4 flex flex-col xs:flex-row  ">
          <img
            src="/marmitaFeita.png"
            alt="Restaurante"
            className="relative z-10 w-[300px] xs:w-[270px] sm:w-[400px] lg:w-[550px] lg:h-[300px] xl:w-[560px] 2xl:w-[650px] 2xl:h-[340px] "
          />
          <div className="relative z-10 flex xs:flex-col lg:flex-col  xl:flex-col items-center justify-center gap-10 xs:gap-4 lg:gap-3 ">
            <div className="text-center">
              <p className="text-[1rem] font-rubik md:text-[1.4rem] xl:text-[2.6rem]">
                Apartir de
              </p>
              <h4 className="text-[1.5rem] md:text-[2rem] xl:text-[3.2rem] font-bold font-rubik ">
                R$ 10,00
              </h4>
            </div>
            <div className="text-center">
              <h3 className="text-[1rem] md:text-[1.4rem] xl:text-[2rem] font-rubik">
                Peça agora
              </h3>
              <p className="text-[1rem] md:text-[1.5rem] xl:text-[1.7rem]  font-bold font-rubik">
                (74)98816-1999
              </p>
            </div>
          </div>
        </div>
      </section>
      <img
        className="absolute w-full  object-cover bottom-0 h-full opacity-30 "
        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/11/6d/43/excelente-a-melhor-opcao.jpg?w=900&h=500&s=1"
        alt=""
      />
    </div>
  );
}
