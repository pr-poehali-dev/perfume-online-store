import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { toast } from 'sonner';

const HERO_IMG = 'https://cdn.poehali.dev/projects/13cc9ba5-5a5c-4ff8-9a40-93bd447ea799/files/8a74914b-90bc-4f7f-8ba5-444d7b07c2a6.jpg';
const SAMPLES_IMG = 'https://cdn.poehali.dev/projects/13cc9ba5-5a5c-4ff8-9a40-93bd447ea799/files/2824a34c-f6d2-4945-ad34-53f3a434cf22.jpg';

const NAV = [
  { label: 'Главная', href: '#home' },
  { label: 'Каталог', href: '#catalog' },
  { label: 'Новинки', href: '#new' },
  { label: 'Бренды', href: '#brands' },
  { label: 'Доставка', href: '#delivery' },
  { label: 'Контакты', href: '#contacts' },
];

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  notes: string;
  price: number;
  isNew?: boolean;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Silk Restore', brand: 'MARTIN', category: 'Шампунь', notes: 'Кератин · Аргановое масло · Протеины шёлка', price: 2900, isNew: true },
  { id: 2, name: 'Deep Moisture', brand: 'MARTIN', category: 'Гель для душа', notes: 'Алоэ · Гиалуроновая кислота · Ши', price: 2400 },
  { id: 3, name: 'Velvet Scalp', brand: 'ATELIER', category: 'Шампунь', notes: 'Цинк · Биотин · Мята', price: 3200, isNew: true },
  { id: 4, name: 'Gold Ritual', brand: 'MARTIN', category: 'Гель для душа', notes: 'Золотые частицы · Ваниль · Масло жожоба', price: 3800 },
  { id: 5, name: 'Pure Balance', brand: 'ATELIER', category: 'Шампунь', notes: 'Зелёная глина · Розмарин · Цитрус', price: 2700 },
  { id: 6, name: 'Noir Lather', brand: 'ORIENS', category: 'Гель для душа', notes: 'Древесный уголь · Кедр · Мускус', price: 3100, isNew: true },
];

const BRANDS = ['MARTIN', 'ATELIER', 'ORIENS', 'BOTANIQ', 'LUMÈNE', 'PURA'];

interface CartItem extends Product {
  qty: number;
  sample?: boolean;
}

const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (p: Product, sample = false) => {
    const price = sample ? 290 : p.price;
    setCart((prev) => {
      const key = (i: CartItem) => i.id === p.id && !!i.sample === sample;
      const exist = prev.find(key);
      if (exist) return prev.map((i) => (key(i) ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1, sample, price }];
    });
    toast.success(sample ? `Пробник «${p.name}» в корзине` : `«${p.name}» в корзине`);
    setCartOpen(true);
  };

  const removeItem = (idx: number) =>
    setCart((prev) => prev.filter((_, i) => i !== idx));

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[hsl(var(--gold))] selection:text-background">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="container flex items-center justify-between h-20">
          <a href="#home" className="font-display text-3xl tracking-[0.3em] text-gold">
            MARTIN
          </a>
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 text-foreground hover:text-gold transition-colors"
          >
            <Icon name="ShoppingBag" size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-[hsl(var(--gold))] text-background text-[11px] flex items-center justify-center font-medium">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
        </div>
        <div className="container relative z-10 pt-20">
          <div className="max-w-xl">
            <p className="text-gold text-xs tracking-luxe uppercase mb-6 animate-fade-up">
              Премиальный уход
            </p>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.95] mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Ритуал<br />
              <span className="italic text-gold">красоты</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Шампуни и гели для душа с профессиональными формулами. Попробуйте пробник перед покупкой полного объёма.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="rounded-none px-10 h-14 tracking-[0.15em] uppercase text-xs bg-[hsl(var(--gold))] text-background hover:bg-[hsl(var(--gold))]/90">
                <a href="#catalog">Смотреть каталог</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none px-10 h-14 tracking-[0.15em] uppercase text-xs border-gold text-gold hover:bg-[hsl(var(--gold))] hover:text-background">
                <a href="#samples">Заказать пробники</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-28 container">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-luxe uppercase mb-4">Коллекция</p>
          <h2 className="font-display text-5xl md:text-6xl">Каталог средств</h2>
          <div className="gold-line h-px w-24 mx-auto mt-8" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-card border border-border/60">
                <img
                  src={HERO_IMG}
                  alt={p.name}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                {p.isNew && (
                  <span className="absolute top-4 left-4 bg-[hsl(var(--gold))] text-background text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                    Новинка
                  </span>
                )}
                <span className="absolute top-4 right-4 bg-background/70 backdrop-blur text-foreground text-[10px] tracking-[0.15em] uppercase px-3 py-1">
                  {p.category}
                </span>
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => addToCart(p, true)}
                    className="border-gold border text-gold text-[11px] tracking-[0.2em] uppercase px-5 py-2 bg-background/60 backdrop-blur hover:bg-[hsl(var(--gold))] hover:text-background transition-colors"
                  >
                    Пробник · 290 ₽
                  </button>
                </div>
              </div>
              <div className="pt-5 text-center">
                <p className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase mb-2">{p.brand}</p>
                <h3 className="font-display text-2xl mb-2">{p.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{p.notes}</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-gold text-lg">{fmt(p.price)}</span>
                  <button
                    onClick={() => addToCart(p)}
                    className="text-[11px] tracking-[0.2em] uppercase border-b border-gold text-gold hover:opacity-70 transition-opacity pb-0.5"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section id="new" className="py-28 bg-card/40 border-y border-border/60">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-luxe uppercase mb-4">Только что прибыли</p>
            <h2 className="font-display text-5xl md:text-6xl">Новинки сезона</h2>
            <div className="gold-line h-px w-24 mx-auto mt-8" />
          </div>
          <div className="grid sm:grid-cols-3 gap-10">
            {PRODUCTS.filter((p) => p.isNew).map((p) => (
              <div key={p.id} className="text-center border border-border/60 p-8 bg-background/40 hover:border-gold transition-colors duration-500">
                <Icon name="Sparkles" size={28} className="mx-auto text-gold mb-5" />
                <p className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase mb-1">{p.brand}</p>
                <p className="text-[11px] tracking-[0.15em] text-gold uppercase mb-2">{p.category}</p>
                <h3 className="font-display text-2xl mb-2">{p.name}</h3>
                <p className="text-xs text-muted-foreground mb-5">{p.notes}</p>
                <p className="text-gold text-lg mb-5">{fmt(p.price)}</p>
                <Button onClick={() => addToCart(p)} variant="outline" className="rounded-none border-gold text-gold hover:bg-[hsl(var(--gold))] hover:text-background tracking-[0.15em] uppercase text-xs">
                  В корзину
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Samples feature */}
      <section id="samples" className="py-28 container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square overflow-hidden border border-border/60">
            <img src={SAMPLES_IMG} alt="Пробники средств" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-gold text-xs tracking-luxe uppercase mb-4">Эксклюзивно</p>
            <h2 className="font-display text-5xl md:text-6xl mb-8 leading-tight">
              Закажите<br /><span className="italic text-gold">пробники</span> средств
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Не уверены в выборе? Закажите пробник любого шампуня или геля для душа и убедитесь в качестве, прежде чем покупать полный объём.
            </p>
            <ul className="space-y-4 mb-10">
              {['Любое средство из каталога — 290 ₽', 'Мини-формат 30–50 мл — хватает на 5–7 применений', 'Скидка 10% на полный объём после пробника'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <Icon name="Check" size={18} className="text-gold shrink-0" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="rounded-none px-10 h-14 tracking-[0.15em] uppercase text-xs bg-[hsl(var(--gold))] text-background hover:bg-[hsl(var(--gold))]/90">
              <a href="#catalog">Выбрать пробники</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="py-28 bg-card/40 border-y border-border/60">
        <div className="container text-center">
          <p className="text-gold text-xs tracking-luxe uppercase mb-4">Наши партнёры</p>
          <h2 className="font-display text-5xl md:text-6xl mb-16">Бренды</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/60 border border-border/60">
            {BRANDS.map((b) => (
              <div key={b} className="bg-background py-14 flex items-center justify-center hover:bg-card transition-colors duration-500">
                <span className="font-display text-2xl tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section id="delivery" className="py-28 container">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-luxe uppercase mb-4">Сервис</p>
          <h2 className="font-display text-5xl md:text-6xl">Доставка и оплата</h2>
          <div className="gold-line h-px w-24 mx-auto mt-8" />
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: 'Truck', title: 'Доставка по России', text: 'Курьером и почтой за 1–5 дней. Бесплатно при заказе от 5 000 ₽.' },
            { icon: 'CreditCard', title: 'Удобная оплата', text: 'Картой онлайн, при получении или через СБП. Безопасно и быстро.' },
            { icon: 'ShieldCheck', title: 'Гарантия качества', text: 'Только сертифицированная косметика с проверенными формулами.' },
          ].map((c) => (
            <div key={c.title} className="text-center p-10 border border-border/60 hover:border-gold transition-colors duration-500">
              <Icon name={c.icon} size={34} className="mx-auto text-gold mb-6" />
              <h3 className="font-display text-2xl mb-4">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-28 bg-card/40 border-t border-border/60">
        <div className="container grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-gold text-xs tracking-luxe uppercase mb-4">Свяжитесь с нами</p>
            <h2 className="font-display text-5xl md:text-6xl mb-10">Контакты</h2>
            <ul className="space-y-6">
              {[
                { icon: 'MapPin', text: 'Москва, Столешников пер., 14' },
                { icon: 'Phone', text: '+7 (495) 000-00-00' },
                { icon: 'Mail', text: 'hello@martin.ru' },
                { icon: 'Clock', text: 'Ежедневно с 10:00 до 22:00' },
              ].map((c) => (
                <li key={c.text} className="flex items-center gap-4">
                  <Icon name={c.icon} size={20} className="text-gold shrink-0" />
                  <span className="text-muted-foreground">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Сообщение отправлено. Мы свяжемся с вами.');
              (e.target as HTMLFormElement).reset();
            }}
            className="space-y-5"
          >
            <Input placeholder="Ваше имя" required className="rounded-none h-12 bg-background border-border focus-visible:ring-[hsl(var(--gold))]" />
            <Input type="email" placeholder="Email" required className="rounded-none h-12 bg-background border-border focus-visible:ring-[hsl(var(--gold))]" />
            <Textarea placeholder="Сообщение" rows={5} className="rounded-none bg-background border-border focus-visible:ring-[hsl(var(--gold))]" />
            <Button type="submit" size="lg" className="rounded-none w-full h-14 tracking-[0.15em] uppercase text-xs bg-[hsl(var(--gold))] text-background hover:bg-[hsl(var(--gold))]/90">
              Отправить
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/60">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl tracking-[0.3em] text-gold">MARTIN</span>
          <p className="text-xs text-muted-foreground tracking-wider">© 2026 MARTIN. Все права защищены.</p>
          <div className="flex gap-5">
            {['Instagram', 'Send', 'Facebook'].map((i) => (
              <a key={i} href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Icon name={i} size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Cart */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="bg-background border-border w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle className="font-display text-3xl text-left">Корзина</SheetTitle>
          </SheetHeader>
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <Icon name="ShoppingBag" size={40} className="text-muted-foreground" />
              <p className="text-muted-foreground">Корзина пуста</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-5 py-6">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center border-b border-border/60 pb-5">
                    <img src={HERO_IMG} alt="" className="w-16 h-20 object-cover border border-border/60" />
                    <div className="flex-1">
                      <h4 className="font-display text-xl">{item.name}</h4>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                        {item.sample ? `Пробник · ${item.category}` : item.category} · {item.qty} шт.
                      </p>
                      <p className="text-gold text-sm mt-1">{fmt(item.price * item.qty)}</p>
                    </div>
                    <button onClick={() => removeItem(idx)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Icon name="Trash2" size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-5 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Итого</span>
                  <span className="font-display text-3xl text-gold">{fmt(total)}</span>
                </div>
                <Button
                  onClick={() => toast.success('Заказ оформлен! Мы свяжемся с вами для подтверждения.')}
                  size="lg"
                  className="rounded-none w-full h-14 tracking-[0.15em] uppercase text-xs bg-[hsl(var(--gold))] text-background hover:bg-[hsl(var(--gold))]/90"
                >
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
