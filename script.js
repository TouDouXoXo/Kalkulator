const liczby = document.querySelectorAll('.liczba') //definiowanie zmienej odpowiadającej za liczby  :
const operatory = document.querySelectorAll('.operator') //definiowanie zmienej odpowiadającej za operator :
const wyczysc = document.querySelector('.wyczysc') //definiowanie zmienej odpowiadającej za wyczysc :
const usun = document.querySelector('.usun') //definiowanie zmienej odpowiadającej za usun :
const rownosc = document.querySelector('.rownosc') //definiowanie zmienej odpowiadającej za rownosc :
const wynikPoprzednie = document.querySelector('.poprzednie-dzialanie') //definiowanie zmienej odpowiadającej za poprzednie-dzialanie :
const wynikAktualne = document.querySelector('.aktualne-dzialanie') //definiowanie zmienej odpowiadającej za aktualne-dzialanie :
// pierwsze 7 linijek kodu definiują definiujemy działanie przycisków:

let aktualneDzialanie = '' // zmiena odpowiadająca za a.dziłanie i ta zmiena zachowuje wartość działania :
let operacja = undefined // zmiena odpowiadająca za operacje np.dodawanie i przechowuje aktualne informacie kture się zmieniają czyli jak jest + i go mnienimy na - to będzie - :
let poprzednieDzialanie = '' // zmiena odpowiadająca za p.dziłanie i ta zmiena zachowuje wartość działania :

//pętla odpowiadająca za aktualizowanie naszych obliczeń na tablicy wyników :
const oblicz = () => {  
  let dzialanie
  if(!poprzednieDzialanie || !aktualneDzialanie) { //jeśli nie ma jednej z wartości to wychodzimy z funkji bo nie morzna wykonać operaci
    return
  }
//const to Tworzy stałą, która może być globalna lub lokalna dla funkcji, która ją zadeklarowała. Zasady zasięgu dla stałych są takie same jak dla zmiennych. 
//Wartość stałej nie może zostać zmieniona poprzez ponowne przypisanie; stała nie może także być ponownie zadeklarowana.
//Stała nie może mieć takiej samej nazwy jak funkcja lub zmienna o tym samym zasięgu.

  const poprzednie = parseFloat(poprzednieDzialanie)//zmiene (linijka 21 i 22)
  const aktualne = parseFloat(aktualneDzialanie)//"parsefloat" przemiana stringa na zmieną z przcinkiem (float)

  if(isNaN(poprzednie) || isNaN(aktualne)) { //sprawdzenie czy da się przeprowadzić operacie (wtedy nic nie wykonujemy)
    return                                   //"isNaN" - is not a number nie jest liczbą
  }
                      //Instrukcja switch służy do wykonywania różnych działań na podstawie różnych warunków.
  switch (operacja) { //urzycie 'switch' pozwala na zaoszczędzenie 'if' czyli nie trzeba wstawiać multum if -uw
    case '+': //case to element switcha on definiuje funkcje kture oferuje switch
      dzialanie = poprzednie + aktualne
      break
      case '-':
        dzialanie = poprzednie - aktualne
      break
      case '×':
        dzialanie = poprzednie * aktualne
      break
      case '÷':
      if(aktualne === 0) // zabespieczenie przed dzieleniem przez 0
      {
        wyczyscWynik()
        return
      }
        dzialanie = poprzednie / aktualne
      break
      case '^':
        dzialanie = Math.pow(poprzednie, aktualne)
      break
      case '%':
        dzialanie = poprzednie / 100 * aktualne
      break
      case '√':
        dzialanie = Math.pow(poprzednie, 1 / aktualne) //to samo co w potengowaniu ale dzielimy przez stopien aktualny (1 / aktualny) 
      break
      case 'log':
        dzialanie = Math.log(poprzednie) / Math.log(aktualne)
      break
    default:
      return
  }
  aktualneDzialanie = dzialanie //to samo co w linijce10 (podmiana pustego na "dzialanie")
  operacja = undefined //to samo co w linijce 11
  poprzednieDzialanie = '' //to samo co w linijce  12

}


const wybierzOperacje = (operator) => {
  if(aktualneDzialanie === '') {
    return //jeśli aktualne działanie jest pusete robi się wtedy "return" - niema działania nie ma operaci
  }
  if(poprzednieDzialanie !== '') {
    const poprzednie = wynikPoprzednie.innerText
    if(aktualneDzialanie.toString() === '0' &&  poprzednie[poprzednie.length - 1] === '÷') { // zabespieczenie przed dzieleniem przez 0
      wyczyscWynik() // if z linijki 74 definiuje na m jeśli cały string jest to 0 "=== '0'" i porzedni string === '÷' to czyści wynik wi wraca ([poprzednie.length - 1] sprawdza nam czy nakońcu poprzdniego wyniku jest znak liczba zdefiniowana czyli w tym wypadku ÷ )
      return
    }
    oblicz()
  }

  operacja = operator
  poprzednieDzialanie = aktualneDzialanie
  aktualneDzialanie = ''
}

const dodajLiczbe = (liczba) => {
  if(liczba === '•') {
    if(aktualneDzialanie.includes('.')) { //jest to pętla ktura sprawdza czy sting zawiera kropkeę jesili nie to nic nie robi ta pętla + zabespiecza przed dodaniem kolejnej kropki
      return
    }
    liczba = '.'
  } // dzęki temu morzna prowadzić obliczenia na liczbach z kropką (podmienia kropke typu bulet point na zwykłą kropkę) :

  aktualneDzialanie = aktualneDzialanie.toString() + liczba.toString() // odpowiada za dodawanie 
}

const usunLiczbe = () => {
  aktualneDzialanie = aktualneDzialanie.toString().slice(0, -1) //zwykła funkcia ktura usuwa liczbę (wycięcie wszystkich licz prucz ostatniej liczby w stringu )
}

const zaktualizujWynik = () => {
  wynikAktualne.innerText = aktualneDzialanie

  if(operacja != null) { //wyśfietla operatora w poprzednim działaniu 
  wynikPoprzednie.innerText = poprzednieDzialanie + operacja
  } else { //"else" - jesili (jesili nie ma operaci to nie będzie poprzedniego działania)
    wynikPoprzednie.innerText = ''
  }
}

const wyczyscWynik = () => {  //funkcja czyszcząca cały kalkulator
  aktualneDzialanie = ''
  operacja = undefined
  poprzednieDzialanie = ''
}

liczby.forEach((liczba) => {
  liczba.addEventListener('click', () => {
    dodajLiczbe(liczba.innerText)
    zaktualizujWynik()
  })
})

operatory.forEach((operator) => {
  operator.addEventListener('click', () => {
    wybierzOperacje(operator.innerText)
    zaktualizujWynik()
  })
})

rownosc.addEventListener('click', () => { //funkcja odpowiadająca za działanie klawisza ruwna się  (funkcionalność klawisza)
  oblicz()
  zaktualizujWynik()
})

usun.addEventListener('click', () => { //funkcja odpowiadająca za działanie klawisza usuwania (funkcionalność klawisza)
  usunLiczbe()
  zaktualizujWynik()
})

wyczysc.addEventListener('click', () => { //funkcja czyszcząca cały kalkulator (funkcionalność klawisza)
  wyczyscWynik()
  zaktualizujWynik()
})